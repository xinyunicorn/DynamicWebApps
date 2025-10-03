import {useState, useEffect, useRef} from 'react'
import cx from 'classnames'
import {twMerge} from 'tailwind-merge'
import PropTypes from 'prop-types'

const Carousel = (props) => {
  // destructure props with defaults
  const {images = [], captions = [], autoPlay = false, interval = 3000, className, ...otherProps} = props

  // state: index of the current slide
  const [current, setCurrent] = useState(0)

  // ref to store the interval ID for autoplay
  const timerRef = useRef(null)

  // go to the next slide and reset autoplay
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
    resetTimer()
  }

  // go to the previous slide and reset autoplay
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
    resetTimer()
  }

  // clear and restart the autoplay timer
  const resetTimer = () => {
    if (!autoPlay) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
  }

  // initialize / update autoplay on every render
  useEffect(() => {
    if (!autoPlay) return
    // clear any previous interval
    if (timerRef.current) clearInterval(timerRef.current)
    // start new interval
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
    // cleanup on unmount
    return () => clearInterval(timerRef.current)
  })

  // base classes for the carousel container
  const baseClass = 'relative w-full max-w-lg overflow-hidden rounded-2xl shadow-md'
  const classes = twMerge(cx(baseClass, className))

  return (
    <div {...otherProps} className={classes}>
      {/* Current Image */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 object-cover transition-all duration-500"
      />

      {/* Optional caption */}
      {captions[current] && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
          {captions[current]}
        </div>
      )}

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        ›
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => {
          const isActive = current === idx
          return (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx)
                resetTimer()
              }}
              className={twMerge(
                cx('w-3 h-3 rounded-full', { 'bg-white': isActive, 'bg-gray-400': !isActive })
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

// prop validation
Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  captions: PropTypes.arrayOf(PropTypes.string),
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  className: PropTypes.string,
}

export default Carousel
