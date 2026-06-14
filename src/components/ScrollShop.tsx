import { useState } from 'react'
import { BookOpen, Search, Wrench, ScrollText, CheckCircle, XCircle, Sparkles, X } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'
import { getRepairCost, getIdentifySuccessChance } from '@/data/scrolls'
import type { ScrollAuthenticity } from '@/types'

export default function ScrollShop() {
  const {
    scrolls,
    gold,
    reputation,
    lastScrollResult,
    buyScroll,
    identifyScroll,
    repairScroll,
    clearScrollResult,
  } = useGameStore()

  const [identifyScrollId, setIdentifyScrollId] = useState<string | null>(null)

  const availableScrolls = scrolls.filter((s) => !s.isPurchased)
  const purchasedScrolls = scrolls.filter((s) => s.isPurchased)

  const handleIdentify = (scrollId: string, guess: ScrollAuthenticity) => {
    identifyScroll(scrollId, guess)
    setIdentifyScrollId(null)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case '完好': return 'text-tea'
      case '轻微破损': return 'text-gold'
      case '严重破损': return 'text-amber-600'
      case '残缺不全': return 'text-cinnabar'
      default: return 'text-ink'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门': return 'text-tea'
      case '进阶': return 'text-blue-600'
      case '困难': return 'text-purple-600'
      case '大师级': return 'text-cinnabar'
      default: return 'text-ink'
    }
  }

  return (
    <div className="scroll-panel">
      <h2 className="text-2xl font-brush text-sandal mb-2 flex items-center gap-2">
        <ScrollText className="w-6 h-6" /> 旧书摊
      </h2>
      <p className="text-sm text-ink-light mb-4">淘残卷、辨真伪、修补缺页，修成后可作为夜场说书的独家故事</p>

      {lastScrollResult && (
        <div className={`mb-4 p-4 rounded-lg border-2 ${
          lastScrollResult.wasCorrect
            ? 'bg-tea/10 border-tea/30'
            : 'bg-cinnabar/10 border-cinnabar/30'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {lastScrollResult.wasCorrect ? (
                <CheckCircle className="w-5 h-5 text-tea" />
              ) : (
                <XCircle className="w-5 h-5 text-cinnabar" />
              )}
              <div>
                <div className={`font-song font-semibold ${
                  lastScrollResult.wasCorrect ? 'text-tea' : 'text-cinnabar'
                }`}>
                  {lastScrollResult.wasCorrect ? '考据正确！' : '考据失误！'}
                </div>
                <div className="text-sm text-ink-light">
                  判定为「{lastScrollResult.identifiedAs}」
                  {lastScrollResult.reputationChange > 0 && (
                    <span className="text-tea ml-2">+{lastScrollResult.reputationChange} 声望</span>
                  )}
                  {lastScrollResult.reputationChange < 0 && (
                    <span className="text-cinnabar ml-2">{lastScrollResult.reputationChange} 声望</span>
                  )}
                  {lastScrollResult.goldChange > 0 && (
                    <span className="text-gold ml-2">+{lastScrollResult.goldChange} 文</span>
                  )}
                  {lastScrollResult.goldChange < 0 && (
                    <span className="text-cinnabar ml-2">{lastScrollResult.goldChange} 文</span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={clearScrollResult}
              className="text-ink-light hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="divider-ancient font-brush text-lg mb-3">【今日残卷】</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {availableScrolls.map((scroll) => (
          <div key={scroll.id} className="card-ancient">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📜</div>
              <div className="flex-1">
                <div className="font-song font-semibold text-ink">{scroll.title}</div>
                <div className="text-xs text-ink-light mt-1 line-clamp-2">{scroll.summary}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {scroll.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-sandal/10 text-sandal rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className={getConditionColor(scroll.condition)}>
                    {scroll.condition}
                  </span>
                  <span className={getDifficultyColor(scroll.difficulty)}>
                    考据难度：{scroll.difficulty}
                  </span>
                </div>
                <div className="text-xs text-ink-light mt-1 italic">
                  「{scroll.sellerHint}」
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-sandal/20">
              <div className="text-gold font-song font-semibold">
                <span className="text-xs text-ink-light mr-1">售价</span>
                {scroll.price} 文
              </div>
              <button
                onClick={() => buyScroll(scroll.id)}
                disabled={gold < scroll.price}
                className="btn-gold text-sm py-1.5 px-3"
              >
                买下
              </button>
            </div>
          </div>
        ))}
        {availableScrolls.length === 0 && (
          <div className="col-span-2 text-center py-6 text-ink-light">
            今日旧书摊的残卷已售罄
          </div>
        )}
      </div>

      {purchasedScrolls.length > 0 && (
        <>
          <div className="divider-ancient font-brush text-lg mb-3">【已购残卷】</div>
          <div className="space-y-3">
            {purchasedScrolls.map((scroll) => {
              const repairCost = getRepairCost(scroll)
              const identifyChance = getIdentifySuccessChance(scroll, reputation)
              return (
                <div key={scroll.id} className="card-ancient">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">
                      {scroll.isRepaired ? '📖' : scroll.identified ? '🔍' : '📜'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-song font-semibold text-ink">{scroll.title}</div>
                        {scroll.identified && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            scroll.authenticity === '真迹'
                              ? 'bg-tea/20 text-tea'
                              : scroll.authenticity === '伪本'
                              ? 'bg-cinnabar/20 text-cinnabar'
                              : 'bg-gold/20 text-gold'
                          }`}>
                            {scroll.authenticity}
                          </span>
                        )}
                        {scroll.isRepaired && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-sparkle/20 text-sparkle flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> 修复完成
                          </span>
                        )}
                      </div>

                      {!scroll.isRepaired && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-ink-light mb-1">
                            <span>修复进度</span>
                            <span>{scroll.repairProgress}%</span>
                          </div>
                          <div className="h-2 bg-paper-dark rounded-full overflow-hidden">
                            <div
                              className="h-full bg-tea transition-all"
                              style={{ width: `${scroll.repairProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2">
                        {scroll.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-sandal/10 text-sandal rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {scroll.isRepaired && scroll.repairedStory && (
                        <div className="mt-2 p-2 bg-sparkle/5 rounded border border-sparkle/20">
                          <div className="text-xs text-sparkle font-semibold mb-1">✨ 已解锁新故事</div>
                          <div className="text-sm text-ink">{scroll.repairedStory.title}</div>
                          <div className="text-xs text-ink-light mt-1">可在夜场作为候选故事</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-sandal/20">
                    <div className="flex gap-2">
                      {!scroll.identified && identifyScrollId !== scroll.id && (
                        <button
                          onClick={() => setIdentifyScrollId(scroll.id)}
                          className="btn-wood text-sm py-1.5 px-3 flex items-center gap-1"
                        >
                          <Search className="w-4 h-4" /> 考据
                        </button>
                      )}
                      {!scroll.isRepaired && (
                        <button
                          onClick={() => repairScroll(scroll.id)}
                          disabled={gold < repairCost}
                          className="btn-gold text-sm py-1.5 px-3 flex items-center gap-1"
                        >
                          <Wrench className="w-4 h-4" />
                          修补 {repairCost > 0 && `(${repairCost}文)`}
                        </button>
                      )}
                    </div>
                    {!scroll.identified && (
                      <div className="text-xs text-ink-light">
                        成功率: {identifyChance}%
                      </div>
                    )}
                  </div>

                  {identifyScrollId === scroll.id && (
                    <div className="mt-3 p-3 bg-paper-dark rounded-lg border border-sandal/20">
                      <div className="text-sm font-song text-ink mb-2">请判定此残卷的真伪：</div>
                      <div className="flex gap-2">
                        {(['真迹', '伪本', '存疑'] as ScrollAuthenticity[]).map((option) => (
                          <button
                            key={option}
                            onClick={() => handleIdentify(scroll.id, option)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-song transition-colors ${
                              option === '真迹'
                                ? 'bg-tea/20 hover:bg-tea/30 text-tea border border-tea/30'
                                : option === '伪本'
                                ? 'bg-cinnabar/20 hover:bg-cinnabar/30 text-cinnabar border border-cinnabar/30'
                                : 'bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setIdentifyScrollId(null)}
                        className="mt-2 text-xs text-ink-light hover:text-ink w-full text-center"
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
