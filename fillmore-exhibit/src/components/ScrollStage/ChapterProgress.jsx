export default function ChapterProgress({
  chapters,
  activeIndex,
  onChapterSelect,
}) {
  const progress =
    chapters.length > 1 ? (activeIndex / (chapters.length - 1)) * 100 : 0

  return (
    <nav className="chapter-progress" aria-label="Exhibit chapters">
      <div className="chapter-progress__rail" aria-hidden="true">
        <div
          className="chapter-progress__fill"
          style={{ height: `${progress}%` }}
        />
      </div>

      <ol className="chapter-progress__list">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex
          const isPast = index < activeIndex

          return (
            <li key={chapter.id} className="chapter-progress__item">
              <button
                type="button"
                className={`chapter-progress__dot${
                  isActive ? ' is-active' : ''
                }${isPast ? ' is-past' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${chapter.label}${isActive ? ' (current)' : ''}`}
                onClick={() => onChapterSelect(index)}
              >
                <span className="chapter-progress__dot-core" />
              </button>
              <span
                className={`chapter-progress__label${
                  isActive ? ' is-visible' : ''
                }`}
              >
                {chapter.shortLabel ?? chapter.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
