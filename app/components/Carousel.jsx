import React, { useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import { useEmblaCarousel } from 'embla-carousel/react'
import { PrevButton, NextButton } from './CarouselButton'

// import screenShot1 from '../../public/screenshots/treasure_inc_screen_1.png'
// import screenShot2 from '../../public/screenshots/treasure_inc_screen_2.png'
// import screenShot3 from '../../public/screenshots/treasure_inc_screen_3.png'
// import screenShot4 from '../../public/screenshots/treasure_inc_screen_4.png'

const Carousel = ({ slides }) => {
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        skipSnaps: false
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                    {slides.map((element, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__inner">
                                <Image
                                    className="embla__slide__img"
                                    src={element}
                                    alt={"Screen" + index}
                                />
                            </div>
                        </div>
                    ))}
                    {/* <div className="embla__slide" key={1}>
                        <div className="embla__slide__inner">
                            <Image
                                className="embla__slide__img"
                                src={screenShot1}
                                alt={"Screen" + 1}
                            />
                        </div>
                    </div>
                    <div className="embla__slide" key={2}>
                        <div className="embla__slide__inner">
                            <Image
                                className="embla__slide__img"
                                src={screenShot2}
                                alt={"Screen" + 2}
                            />
                        </div>
                    </div>
                    <div className="embla__slide" key={3}>
                        <div className="embla__slide__inner">
                            <Image
                                className="embla__slide__img"
                                src={screenShot3}
                                alt={"Screen" + 3}
                            />
                        </div>
                    </div>
                    <div className="embla__slide" key={4}>
                        <div className="embla__slide__inner">
                            <Image
                                className="embla__slide__img"
                                src={screenShot4}
                                alt={"Screen" + 4}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
    );
};

export default Carousel;
