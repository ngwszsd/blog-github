---
title: 上传文件怎么做
date: 2022-05-25
tags:
 - React QS
categories:
 - React
---

```tsx
import { UploadOutlined, VerticalAlignBottomOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Button, Modal, Upload, message, notification, Tabs } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { request } from 'umi';

import type { ButtonProps , UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

import { uploadImg } from '@/services/device';
import type { ExcelImportResult } from '@/types/ExcelImportResult';
import { exportExcel, getErrorMsg, hasValue } from '@/utils/utils';
import {saveAs} from 'file-saver';

const { TabPane } = Tabs;

function createGuid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export type UploadSuccessCallbackFn = (response: any) => void;

export interface ImportProps {
  /**
   * 弹出框标题
   */
  title: string;
  /**
   * 下载模板的url
   */
  downloadUrl: string; // 下载模板的url
  /**
   * 上传文件分类-moduleType（向后台要）
   */
  moduleType: string;
  /**
   * 文件上传请求url
   * 默认请求地址: /api/file/UploadToFileSystem
   */
  actionUrl?: string;
  /**
   * 导入确认提交url
   */
  submitUrl: string; // 导入文件的url
  /**
   * 请求额外参数
   */
  params?: Record<string, any>;
  /**
   * 请求成功回调函数
   * 导入成功后刷新表格（获取表格数据的方法）
   */
  getTableList: UploadSuccessCallbackFn;
  /**
   * 样式名
   */
  className?: string;
  /**
   * 导入按钮样式
   */
  buttonProps?: ButtonProps;
  /**
   * 重传次数
   */
  retryCount?: number;
  /**
   * 禁用覆盖导入
   * @default false
   */
  noCover?: boolean;
  /**
   * 是否上传成功校验函数
   * @param response
   */
  validateFn?: (response: any) => ExcelImportResult;
}

const BatchImport: React.FC<ImportProps> = (props) => {
  const [importModalShow, setImportModalShow] = useState(false);
  const [excelFilePath, setExcelFilePath] = useState('');
  const [uploadType, setUploadType] = useState('1');
  const [fileList, setFileList] = useState([]);

  const chunkSize = 1024 * 1024;

  const retryCount = useMemo(() => {
    if (hasValue(props.retryCount)) {
      return props.retryCount!;
    }
    return 0;
  }, [props.retryCount]);

  const actionUrl = useMemo(() => {
    return props.actionUrl ?? '/api/file/UploadToFileSystem';
  }, [props.actionUrl]);

  // 批量导入
  const importData = () => {
    setExcelFilePath('');
    setFileList([]);
    setImportModalShow(true);
  };

  // 增量导入 or 覆盖导入
  const changeUploadType = (key: string) => {
    setUploadType(key);
  };

  // 下载模板
  const getTemplate = useCallback(() => {
    // window.location.href = props.downloadUrl;
    request(props.downloadUrl, {
      responseType: 'blob',
    }).then((res: any) => {
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      console.log(blob);
      const fileName = `${props.title}_模板.xlsx`;
      exportExcel(blob, fileName);
    });
  }, [props.downloadUrl, props.title]);

  const beforeUploadFile = (file: any) => {
    const isCorrectFile =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';
    if (!isCorrectFile) {
      message.error('请上传xls或xlsx格式的文件').then();
    }
    return isCorrectFile;
  };

  const fileUpload = (
    option: UploadRequestOption,
    guid: string,
    partNum: number,
    partTotal: number,
    requestList: { request: Promise<any>; status: string; retryCount: number }[] | undefined[],
    callback: {
      onSuccess: (response: any) => void;
      onError: (err: Error) => void;
      onProgress: (percent: number) => void;
    },
  ) => {
    const file = option.file as RcFile;
    const formData = new FormData();
    // 将文件进行分段
    const chunkedFile = file.slice(partNum * chunkSize, (partNum + 1) * chunkSize);
    formData.append('file', chunkedFile);
    formData.append('name', file.name);
    formData.append('chunk', `${partNum}`);
    formData.append('totalFileSize', `${file.size}`);
    formData.append('moduleType', props.moduleType);
    formData.append('maxChunk', `${partTotal}`);
    formData.append('guid', guid);
    const promise = uploadImg(formData)
      .then((res) => {
        const config = requestList[partNum];
        if (res.code === 200) {
          callback.onProgress(parseInt(String(((partNum + 1) / partTotal) * 100), 10));
          if (partNum + 1 === partTotal) {
            requestList.splice(partNum, 1, {
              request: promise,
              status: 'resolved',
              retryCount: config?.retryCount ?? 0,
            });
            const { onSuccess } = callback;
            onSuccess(res);
          } else if (partNum < partTotal) {
            const req = fileUpload(option, guid, partNum + 1, partTotal, requestList, callback);
            requestList.splice(partNum + 1, 1, {
              request: req,
              status: 'resolved',
              retryCount: config?.retryCount ?? 0,
            });
          }
        } else {
          throw new Error(getErrorMsg(res));
        }
      })
      .catch((err) => {
        const config = requestList[partNum];
        if (config) {
          // 进行错误重传
          if (config.retryCount < retryCount) {
            const req = fileUpload(option, guid, partNum, partTotal, requestList, callback);
            requestList.splice(partNum, 1, {
              request: req,
              status: 'pending',
              retryCount: config.retryCount + 1,
            });
          } else {
            requestList.splice(partNum, 1, {
              ...config,
              status: 'error',
            });
            const { onError } = callback;
            onError(err);
          }
        } else {
          // 增加处理-不需要重传处
          if (retryCount) {
            const req = fileUpload(option, guid, partNum, partTotal, requestList, callback);
            requestList.splice(partNum, 1, {
              request: req,
              status: 'pending',
              retryCount: 1,
            });
          }
          requestList.splice(partNum, 1, {
            request: Promise.reject(),
            status: 'error',
            retryCount: 0,
          });
          const { onError } = callback;
          onError(err);
        }
      });
    return promise;
  };

  const customRequest = async (option: UploadRequestOption) => {
    const { onProgress, onError, onSuccess } = option;
    const file = option.file as RcFile;
    const len = Math.ceil(file.size / chunkSize) || 1;
    const requestList = new Array(len);
    const guid = createGuid();

    // 遍历请求列表，将文件分片并进行请求后，替换对应列表项。
    // 请求中增加根据更新、错误重传（3次失败后放弃，整个文件失败）
    const req = fileUpload(option, guid, 0, len, requestList, {
      onProgress: (percent) => onProgress?.({ percent } as any),
      onError: (err: Error) => onError?.(err),
      onSuccess: (res) => {
        onSuccess?.(res.data);
        if (res.data?.data?.completed && res.data?.data?.fileUrl) {
          setExcelFilePath(res.data?.data?.fileUrl);
        }
      },
    });

    req.catch((err) => {
      message.error(getErrorMsg(err));
    });
  };

  const changeFile = (info: any) => {
    let fList: any = [...info.fileList];
    fList = fList.slice(-1);
    if (!fList.length) {
      setExcelFilePath('');
    }
    setFileList(fList);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: actionUrl,
    headers: {
      authorization: 'authorization-text',
    },
    onChange: changeFile,
    beforeUpload: beforeUploadFile,
    customRequest,
  };

  // 确定
  const sureImport = async () => {
    if (excelFilePath === '') {
      message.error('请上传xls或xlsx格式的文件').then();
      return false;
    }
    const params = {
      filePath: excelFilePath,
      override: uploadType !== '1',
    };
    try {
      const response = await request(props.submitUrl, {
        method: 'POST',
        data: { ...params, ...(props.params ?? {}) },
      });
      if (response && response.code === 200) {
        let result: ExcelImportResult | undefined;
        if (props.validateFn) {
          result = props.validateFn(response.data);
        } else {
          result = response.data?.data;
        }
        if (result?.importSuccess) {
          notification.success({
            message: '导入成功',
            description: (
              <div>
                <div>共计 {result.count} 条数据</div>
                <div>导入日期：{new Date().toLocaleString()}</div>
              </div>
            ),
          });
          setImportModalShow(false);
          setTimeout(() => {
            // 默认延时进行通知，防止后续渲染过多导致卡顿
            props.getTableList(response.data);
          }, 50);
        } else if (result?.errorExcelPath) {
          const url = `${BASE_URL_IMAGE}/UpLoads/${props.moduleType}/${result.errorExcelPath}`;
          notification.error({
            message: '导入失败',
            description: (
              <div>
                <div>上传的数据填写不正确。我们已将这部分标示并生成文件，点击下方按钮下载</div>
                <div>
                  <a href={url}>当前导入模板_校验</a>
                </div>
              </div>
            ),
          });
          setImportModalShow(false);
        } else {
          message.error('导入异常');
        }
      } else {
        setImportModalShow(false);
        message.error(getErrorMsg(response.message));
      }
    } catch (err) {
      console.error(err);
      // 错误内容已由全局加入，暂不重复显示
      // message.error(getErrorMsg(err));
    }
  };

  // 取消
  const cancelImport = () => {
    setExcelFilePath('');
    setFileList([]);
    setImportModalShow(false);
  };

  return (
    <div className={props.className}>
      <Button
        { ...props.buttonProps }
        onClick={importData}
      >
        {props.buttonProps?.children ?? '导入'}
      </Button>

      <Modal
        title={`批量导入${props.title}`}
        okText="校验导入"
        visible={importModalShow}
        onOk={sureImport}
        onCancel={cancelImport}
      >
        <div>
          {!props.noCover && (
            <Tabs defaultActiveKey="1" style={{ marginTop: '-10px' }} onChange={changeUploadType}>
              <TabPane tab="增量导入" key="1">
                <InfoCircleFilled style={{ color: '#007aff', margin: '0 10px' }} />
                在已有数据的基础上增加导入全新的数据
              </TabPane>
              <TabPane tab="覆盖导入" key="2">
                <InfoCircleFilled style={{ color: '#007aff', margin: '0 10px' }} />
                导入全新数据的同时，替换与已有数据重复的数据
              </TabPane>
            </Tabs>
          )}
          <div style={{ marginTop: props.noCover ? 0 : '40px' }}>
            <Button onClick={getTemplate} style={{ marginRight: '30px' }}>
              <VerticalAlignBottomOutlined />
              下载空白模板
            </Button>
            <Upload {...uploadProps} fileList={fileList}>
              <Button>
                <UploadOutlined />
                上传模板
              </Button>
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BatchImport;

```