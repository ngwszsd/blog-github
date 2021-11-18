useEffect(() => {
    let isUnmount = false
    if (isSuccess(res) && !isUnmount) {
        ...ajax
    }
    return () => {
        isUnmount = true
    }
})