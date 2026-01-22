gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", function() {
    let lottieContainer = document.querySelectorAll('.animation');

    if (lottieContainer.length > 0) {
        LottieScrollTrigger({
            trigger: '.animation',
            start: 'top center',
            endTrigger: '.end-lottie',
            end: 'bottom center',
            renderer: 'svg',
            target: '.animation',
            path: '3402011 uhd_4096_2160_25fps.json',
            scrub: 2,
        });
    }
});

function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
    st = {
        trigger: vars.trigger || vars.target,
        end: speeds[vars.speed] || '+=1000',
        scrub: 1,
        markers: false,
    },
    ctx = gsap.context && gsap.context(),
    animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || 'svg',
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || {
            preserveAspectRatio: 'xMidYMid slice',
        },
    });

    for (let p in vars) {
        st[p] = vars[p];
    }

    animation.addEventListener("DOMLoaded", function() {
        let createTween = function () {
            animation.frameTween = gsap.to(playhead, {
                frame: animation.totalFrames - 1,
                ease: 'none',
                onUpdate: () => animation.goToAndStop(playhead.frame, true),
                scrollTrigger: st,
            });
            return () => animation.destroy && animation.destroy();
        };
        ctx && ctx.add ? ctx.add(createTween) : createTween();
    });

    return animation;
}

// intro page //

const animation2 = lottie.loadAnimation({
  container: document.querySelector('.animation2'), // where to render it
  renderer: 'svg', // or 'canvas'
  loop: true,      // set to false if you want it to play just once
  autoplay: true,  // play immediately without scroll
  path: 'intro.json', // your Lottie JSON
  rendererSettings: {
    // "slice" = crop to fill (like object-fit: cover). "meet" = contain.
    // 
  preserveAspectRatio: 'xMidYMid slice'
  }
});