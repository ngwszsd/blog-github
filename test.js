document.body.removeEventListener('touchmove', this.scroll || window.scroll, {passive: true});
document.body.style.overflow = 'auto';