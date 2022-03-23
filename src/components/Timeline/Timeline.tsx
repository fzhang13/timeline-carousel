import { useEffect, useState } from 'react';
import { useRef } from 'react';
import classnames from 'classnames';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin';
import { Pagination, Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Timeline.module.scss';

import SVGCurrentYearDot from '../../assets/images/currentYearDot.svg';
import SVGTimeDot from '../../assets/images/timeDot.svg';
import SVGtimeMap from '../../assets/images/timeMap.svg';

export type Props = {
  className?: string;
};

let positionValue = [
  0, 0.08125, 0.1625, 0.2225, 0.2825, 0.3425, 0.42375, 0.5, 0.58125, 0.6625, 0.7225, 0.7825, 0.8425, 0.92375, 1
];
function Timeline() {
  let [time, setTime] = useState<number>(0);
  let [activeIndex, setActiveIndex] = useState<number>(0);

  // this is what i was using but it gave errors when pushing
  let [mainTimeline, setMainTimeline] = useState<Timeline>(null);
  

  const circleRef = useRef<SVGCircleElement>(null);
  const SVGRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, MorphSVGPlugin);
    MorphSVGPlugin.convertToPath('#circle');
    MorphSVGPlugin.convertToPath('#yearCircle');
    gsap.to('#circle', { duration: 0, drawSVG: '0%', rotation: -90, transformOrigin: '50% 50%' });
    gsap.to('#yearCircle', { duration: 0, drawSVG: '0%', rotation: -90, transformOrigin: '50% 50%' });
    gsap.to('#currentYearPoint', {
      duration: 0,
      motionPath: {
        path: '#circle',
        align: '#circle',
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
        end: 0
      }
    });
    placeTimeDots();
    setMainTimeline(
      gsap
        .timeline({ paused: true })

        .to(
          SVGRef.current?.children[0]!,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point0'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[0] * 100}%`, ease: 'power2.out' }, 'point0')
        .to(
          '#currentYearPoint',
          0.25,
          {
            ease: 'power2.out',
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[0],
              end: positionValue[0]
            }
          },
          'point0'
        )

        .add('point0', '>')

        .to(
          SVGRef.current?.children[1]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point1'
        )
        .to('#circle', 0.25, { drawSVG: `0% ${positionValue[1] * 100}%`, ease: 'power2.out' }, 'point1')
        .to(
          '#currentYearPoint',
          0.25,
          {
            ease: 'power2.out',
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[0],
              end: positionValue[1]
            }
          },
          'point1'
        )
        .add('point1', '>')

        .to(
          SVGRef.current?.children[2]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point2'
        )
        .to('#circle', 0.25, { drawSVG: `0% ${positionValue[2] * 100}%`, ease: 'power2.out' }, 'point2')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[1],
              end: positionValue[2]
            }
          },
          'point2'
        )
        .add('point2', '>')

        .to(
          SVGRef.current?.children[3]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point3'
        )
        .to('#circle', 0.25, { drawSVG: `0% ${positionValue[3] * 100}%`, ease: 'power2.out' }, 'point3')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[2],
              end: positionValue[3]
            }
          },
          'point3'
        )
        .add('point3', '>')

        .to(
          SVGRef.current?.children[4]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point4'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[4] * 100}%`, ease: 'power2.out' }, 'point4')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[3],
              end: positionValue[4]
            }
          },
          'point4'
        )
        .add('point4', '>')

        .to(
          SVGRef.current?.children[5]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point5'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[5] * 100}%`, ease: 'power2.out' }, 'point5')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[4],
              end: positionValue[5]
            }
          },
          'point5'
        )
        .add('point5', '>')

        .to(
          SVGRef.current?.children[6]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point6'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[6] * 100}%`, ease: 'power2.out' }, 'point6')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[5],
              end: positionValue[6]
            }
          },
          'point6'
        )
        .add('point6', '>')

        .to(
          SVGRef.current?.children[7]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point7'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[7] * 100}%`, ease: 'power2.out' }, 'point7')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[6],
              end: positionValue[7]
            }
          },
          'point7'
        )
        .add('point7', '>')

        .to(
          SVGRef.current?.children[8]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point8'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[8] * 100}%`, ease: 'power2.out' }, 'point8')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[7],
              end: positionValue[8]
            }
          },
          'point8'
        )
        .add('point8', '>')

        .to(
          SVGRef.current?.children[9]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point9'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[9] * 100}%`, ease: 'power2.out' }, 'point9')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[8],
              end: positionValue[9]
            }
          },
          'point9'
        )
        .add('point9', '>')

        .to(
          SVGRef.current?.children[10]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point10'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[10] * 100}%`, ease: 'power2.out' }, 'point10')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[9],
              end: positionValue[10]
            }
          },
          'point10'
        )
        .add('point10', '>')

        .to(
          SVGRef.current?.children[11]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point11'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[11] * 100}%`, ease: 'power2.out' }, 'point11')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[10],
              end: positionValue[11]
            }
          },
          'point11'
        )
        .add('point11', '>')

        .to(
          SVGRef.current?.children[12]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point12'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[12] * 100}%`, ease: 'power2.out' }, 'point12')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[11],
              end: positionValue[12]
            }
          },
          'point12'
        )
        .add('point12', '>')

        .to(
          SVGRef.current?.children[13]!,
          0.25,
          {
            transformOrigin: '50% 50%',
            svgOrigin: 'none',
            opacity: 1,
            css: { fill: 'black' },
            ease: 'power2.out'
          },
          'point13'
        )
        .to('#circle', 0.25, { drawSVG: `${positionValue[13] * 100}%`, ease: 'power2.out' }, 'point13')
        .to(
          '#currentYearPoint',
          0.25,
          {
            motionPath: {
              path: '#circle',
              align: '#circle',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: positionValue[12],
              end: positionValue[13]
            }
          },
          'point13'
        )
        .add('point13', '>')
    );
  }, []);

  const handleSlideChange: (swiper: SwiperClass) => void = (swiper: SwiperClass) => {
    let tmpTime = time;
    setActiveIndex(swiper.activeIndex);

    tmpTime = positionValue[swiper.activeIndex];
    console.log(tmpTime);

    //had comment this out to push
    mainTimeline.tweenTo('point' + swiper.activeIndex);

    setTime(tmpTime);
    console.log('point' + activeIndex);
  };
  function placeTimeDots() {
    const dotsElem = document.getElementsByClassName(styles.timelineDot);

    for (var i = 0, len = dotsElem.length; i < len; i++) {
      gsap.to('#' + dotsElem[i].id, {
        duration: 0,
        motionPath: {
          path: '#circle',
          align: '#circle',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          end: positionValue[i]
        }
      });
      gsap.to(yearRef.current!.children[i]!, {
        duration: 0,
        motionPath: {
          path: '#yearCircle',
          align: '#yearCircle',
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
          end: positionValue[i]
        }
      });
    }
  }
  return (
    <div className={classnames(styles.Timeline)}>
      <svg width="289" height="288" viewBox="0 0 350 350">
        <circle
          ref={circleRef}
          id="circle"
          className={classnames(styles.timelineLoader)}
          cx="175"
          cy="175"
          r="170"
          stroke="#302F30"
          fill="none"
          strokeWidth=" .19432"
        />
      </svg>
      <svg width="340" height="340">
        <circle
          id="yearCircle"
          className={classnames(styles.timelineLoader)}
          cx="170"
          cy="170"
          r="168"
          stroke="#302F30"
          fill="none"
          strokeWidth=" 1.19432"
        />
      </svg>
      <SVGtimeMap />

      <SVGCurrentYearDot id="currentYearPoint" className={classnames(styles.currentYearPoint)} />
      <div ref={SVGRef}>
        <SVGTimeDot id="point0" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point1" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point2" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point3" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point4" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point5" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point6" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point7" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point8" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point9" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point10" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point11" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point12" className={classnames(styles.timelineDot)} />
        <SVGTimeDot id="point13" className={classnames(styles.timelineDot)} />
      </div>
      <div ref={yearRef}>
        <div id="year1970" className={classnames(styles.timelineYear)}>
          1970
        </div>
        <div id="year1974" className={classnames(styles.timelineYear)}>
          1974
        </div>
        <div id="year1978" className={classnames(styles.timelineYear)}>
          1978
        </div>
        <div id="year1982" className={classnames(styles.timelineYear)}>
          1982
        </div>
        <div id="year1986" className={classnames(styles.timelineYear)}>
          1986
        </div>
        <div id="year1990" className={classnames(styles.timelineYear)}>
          1990
        </div>
        <div id="year1994" className={classnames(styles.timelineYear)}>
          1994
        </div>
        <div id="year1998" className={classnames(styles.timelineYear)}>
          1998
        </div>
        <div id="year2002" className={classnames(styles.timelineYear)}>
          2002
        </div>
        <div id="year2006" className={classnames(styles.timelineYear)}>
          2006
        </div>
        <div id="year2010" className={classnames(styles.timelineYear)}>
          2010
        </div>
        <div id="year2014" className={classnames(styles.timelineYear)}>
          2014
        </div>
        <div id="year2018" className={classnames(styles.timelineYear)}>
          2018
        </div>
        <div id="year2022" className={classnames(styles.timelineYear)}>
          2022
        </div>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true
        }}
        speed={1500}
        onSlideChange={(e) => handleSlideChange(e)}
      >
        <SwiperSlide>hello</SwiperSlide>
        <SwiperSlide>gello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
        <SwiperSlide>hello</SwiperSlide>
        <SwiperSlide>gello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
        <SwiperSlide>hello</SwiperSlide>
        <SwiperSlide>gello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
        <SwiperSlide>hello</SwiperSlide>
        <SwiperSlide>gello</SwiperSlide>
        <SwiperSlide>dello</SwiperSlide>
      </Swiper>

      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}

export default Timeline;
