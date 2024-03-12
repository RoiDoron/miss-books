const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [slicedTxt, setSlicedTxt] = useState(txt.slice(0, length))
  const [isSliced, setIsSliced] = useState(true)

  function toggleIsSliced() {
    if (isSliced) handleUnslice()
    else handleSlice()
  }

  function handleSlice() {
    setSlicedTxt(txt.substring(0, length))
    setIsSliced(true)
  }

  function handleUnslice() {
    setSlicedTxt(txt)
    setIsSliced(false)
  }

  return (
    <section className="long-txt">
      <p>
        {slicedTxt}
        {txt.length > length && (
          <span>
            <button className="long-text-btn" onClick={toggleIsSliced}>...</button>
          </span>
        )}
      </p>
    </section>
  )
}
