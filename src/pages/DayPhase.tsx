import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, BookOpen } from 'lucide-react'
import { useState } from 'react'
import StatusPanel from '@/components/StatusPanel'
import TeaShop from '@/components/TeaShop'
import SeatGrid from '@/components/SeatGrid'
import Renovation from '@/components/Renovation'
import Ledger from '@/components/Ledger'
import ScrollShop from '@/components/ScrollShop'
import { useGameStore } from '@/store/useGameStore'

type DayTab = 'shop' | 'scroll'

export default function DayPhase() {
  const navigate = useNavigate()
  const { phase, switchToNight } = useGameStore()
  const [activeTab, setActiveTab] = useState<DayTab>('shop')

  const handleSwitch = () => {
    switchToNight()
    navigate('/night')
  }

  if (phase !== 'day') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <StatusPanel />
          <div className="scroll-panel text-center py-12">
            <Moon className="w-16 h-16 text-sandal mx-auto mb-4" />
            <h2 className="font-brush text-3xl text-sandal mb-2">已是夜晚</h2>
            <p className="text-ink-light mb-6">当前时段不可进行白天经营活动</p>
            <Link to="/night" className="btn-gold">前往夜晚开讲 →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <StatusPanel />

        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn-wood text-sm">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <button onClick={handleSwitch} className="btn-gold">
            <Moon className="w-5 h-5" /> 准备完毕，入夜开讲 →
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-song transition-colors ${
              activeTab === 'shop'
                ? 'bg-sandal text-white'
                : 'bg-paper-dark text-ink hover:bg-sandal/10'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 茶点采购
          </button>
          <button
            onClick={() => setActiveTab('scroll')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-song transition-colors ${
              activeTab === 'scroll'
                ? 'bg-sandal text-white'
                : 'bg-paper-dark text-ink hover:bg-sandal/10'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 旧书摊
          </button>
        </div>

        {activeTab === 'shop' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TeaShop />
              <Renovation />
            </div>
            <div className="space-y-6">
              <SeatGrid />
              <Ledger />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ScrollShop />
            </div>
            <div className="space-y-6">
              <Ledger />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
