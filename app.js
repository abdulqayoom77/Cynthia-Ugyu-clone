// Smooth Scroll Function

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Mouse move Function

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(details);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}


// Hero Animation
function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        delay: -1,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: '0',
            duration: 2,
            stagger: .2,
            delay: -1,
            ease: Expo.easeInOut
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            ease: Expo.easeInOut,
            delay: -1,
            duration: 2,
        })
}

// Mouse Shrink
// steps

var timeout ;

function mouseShrink(){
    //1) define default scale value
    var xscale = 1;
    var yscale = 1;
    // to know previous scale value 
    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev)
        
        xprev = dets.clientX;
        yprev = dets.clientY;
        
        
        circleMouseFollower(xscale,yscale)
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
            
        },100)
        // console.log(gsap.utils.clamp(.8, 1.2, xdiff)
        // ,gsap.utils.clamp(.8, 1.2, ydiff))
        // console.log(xdiff, ydiff)
    })
}

document.querySelectorAll('.elem').forEach(function (elem) {
    var rotate = 0;
    var diff = 0;
    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: Power3,
        })
    });
    elem.addEventListener("mousemove", function (details) {
        // console.log(details.clientY - elem.)
        var difference = details.clientY - elem.getBoundingClientRect().top;
        diff = details.clientX - rotate;
        rotate = details.clientX;
        // gsap.utils.clamp(-20, 20, diff)
        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: difference,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diff),
        })
    });
});



circleMouseFollower();
firstPageAnim();
mouseShrink();