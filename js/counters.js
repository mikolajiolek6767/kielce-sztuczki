function initCounters() {
  gsap.utils.toArray('.num-counter').forEach(el => {
    const target    = parseFloat(el.dataset.count || 0);
    const isDecimal = target % 1 !== 0;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = isDecimal
              ? this.targets()[0].val.toFixed(1)
              : Math.floor(this.targets()[0].val);
          }
        });
      }
    });
  });
}
