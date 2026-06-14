import type { Scroll } from '@/types'

function createScroll(
  id: string,
  title: string,
  content: string,
  tags: string[],
  authenticity: Scroll['authenticity'],
  condition: Scroll['condition'],
  difficulty: Scroll['difficulty'],
  price: number,
  summary: string,
  sellerHint: string,
  repairedStory?: Scroll['repairedStory']
): Scroll {
  return {
    id,
    title,
    content,
    tags,
    authenticity,
    condition,
    difficulty,
    price,
    summary,
    sellerHint,
    repairedStory,
    isPurchased: false,
    isRepaired: false,
    identified: false,
    repairProgress: 0,
  }
}

export const SCROLLS: Scroll[] = [
  createScroll(
    'sc1',
    '白蛇传·雷峰塔',
    '白娘子水漫金山，被法海镇压于雷峰塔下...',
    ['爱情', '神怪', '悲剧'],
    '真迹',
    '严重破损',
    '进阶',
    120,
    '讲述白娘子与许仙的凄美爱情故事',
    '摊主：这卷是从雷峰塔下挖出的旧抄本，纸色泛黄但字迹工整',
    {
      id: 'scroll-s1',
      title: '白蛇传·雷峰塔',
      tags: ['爱情', '神怪', '悲剧'],
      heat: 75,
      summary: '白娘子与许仙的凄美爱情传奇',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s1-b1',
          title: '第一折：断桥相遇',
          content: '清明时节，烟雨蒙蒙，白娘子与小青在断桥边游玩，忽见一位清秀书生从断桥走来...',
          tags: ['爱情', '相遇'],
          heatModifier: 8,
        },
        {
          id: 'scroll-s1-b2',
          title: '第一折：水漫金山',
          content: '法海将许仙骗至金山寺，白娘子为救夫君，引西湖之水漫灌金山寺...',
          tags: ['神怪', '热血'],
          heatModifier: 12,
        },
      ],
    }
  ),
  createScroll(
    'sc2',
    '岳武穆精忠传',
    '岳飞精忠报国，被秦桧以莫须有罪名害于风波亭...',
    ['历史', '忠义', '战争'],
    '伪本',
    '轻微破损',
    '入门',
    60,
    '讲述岳飞抗金的英雄事迹',
    '摊主：这卷是前朝的刻本，你看这油墨还新着，便宜卖你了',
    {
      id: 'scroll-s2',
      title: '岳武穆精忠传',
      tags: ['历史', '忠义', '战争'],
      heat: 80,
      summary: '岳飞精忠报国的英雄传奇',
      isFromScroll: true,
      isFakeScroll: true,
      branches: [
        {
          id: 'scroll-s2-b1',
          title: '第一回：岳母刺字',
          content: '岳飞即将从军，岳母在其背上刺下"精忠报国"四个大字...',
          tags: ['历史', '忠义'],
          heatModifier: 10,
        },
        {
          id: 'scroll-s2-b2',
          title: '第一回：朱仙镇大捷',
          content: '岳飞率岳家军在朱仙镇大败金兵，直捣黄龙府指日可待...',
          tags: ['战争', '热血'],
          heatModifier: 15,
        },
      ],
    }
  ),
  createScroll(
    'sc3',
    '金瓶梅·西门庆',
    '西门庆一生风流，最终纵欲而亡...',
    ['世情', '讽刺', '禁书'],
    '真迹',
    '残缺不全',
    '困难',
    200,
    '讲述西门庆的一生，内容多有残缺',
    '摊主：这卷可是稀罕物，你看这首页还盖着藏家印章，就是缺了几页',
    {
      id: 'scroll-s3',
      title: '金瓶梅·西门庆',
      tags: ['世情', '讽刺', '禁书'],
      heat: 65,
      summary: '西门庆一生的荒诞故事',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s3-b1',
          title: '第一回：热结十兄弟',
          content: '西门庆与应伯爵等十人在玉皇庙结为兄弟，誓愿富贵相与...',
          tags: ['世情', '讽刺'],
          heatModifier: 5,
        },
        {
          id: 'scroll-s3-b2',
          title: '第一回：遇潘金莲',
          content: '西门庆偶遇潘金莲，两人眉来眼去，王婆从中撮合...',
          tags: ['世情', '风月'],
          heatModifier: 9,
        },
      ],
    }
  ),
  createScroll(
    'sc4',
    '封神榜·哪吒闹海',
    '哪吒大闹东海，抽龙筋为腰带...',
    ['神怪', '冒险', '热血'],
    '真迹',
    '完好',
    '入门',
    90,
    '讲述封神演义中哪吒的故事',
    '摊主：这卷保存极好，几乎没有破损，是家传的宝贝',
    {
      id: 'scroll-s4',
      title: '封神榜·哪吒闹海',
      tags: ['神怪', '冒险', '热血'],
      heat: 85,
      summary: '哪吒闹海的传奇故事',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s4-b1',
          title: '第一回：灵珠子转世',
          content: '陈塘关李靖夫人怀胎三年零六个月，生下一个肉球...',
          tags: ['神怪', '冒险'],
          heatModifier: 12,
        },
        {
          id: 'scroll-s4-b2',
          title: '第一回：大闹东海',
          content: '哪吒七岁时在东海洗澡，打死巡海夜叉，与龙王三太子大战...',
          tags: ['神怪', '热血'],
          heatModifier: 18,
        },
      ],
    }
  ),
  createScroll(
    'sc5',
    '红楼梦·石头记',
    '贾宝玉梦游太虚幻境，查看金陵十二钗判词...',
    ['爱情', '世情', '悲剧'],
    '存疑',
    '严重破损',
    '大师级',
    300,
    '疑似曹雪芹原稿残卷，真伪难辨',
    '摊主：这卷可是从江宁织造府旧址挖出来的，你看这字迹，跟坊间刻本不一样',
    {
      id: 'scroll-s5',
      title: '红楼梦·石头记',
      tags: ['爱情', '世情', '悲剧'],
      heat: 95,
      summary: '贾、史、王、薛四大家族的兴衰史',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s5-b1',
          title: '第一回：通灵宝玉',
          content: '女娲补天剩下的一块顽石，被茫茫大士、渺渺真人携入红尘...',
          tags: ['神怪', '世情'],
          heatModifier: 10,
        },
        {
          id: 'scroll-s5-b2',
          title: '第一回：太虚幻境',
          content: '贾宝玉梦游太虚幻境，警幻仙姑让他翻看金陵十二钗判词...',
          tags: ['爱情', '悲剧'],
          heatModifier: 14,
        },
      ],
    }
  ),
  createScroll(
    'sc6',
    '水浒传·武松打虎',
    '武松景阳冈打虎，成为阳谷县都头...',
    ['武侠', '热血', '江湖'],
    '伪本',
    '轻微破损',
    '进阶',
    80,
    '讲述武松打虎的故事，但文风似有模仿痕迹',
    '摊主：这卷是名家抄本，你看这字写得真好，跟真迹一模一样',
    {
      id: 'scroll-s6',
      title: '水浒传·武松打虎',
      tags: ['武侠', '热血', '江湖'],
      heat: 70,
      summary: '武松景阳冈打虎的英雄故事',
      isFromScroll: true,
      isFakeScroll: true,
      branches: [
        {
          id: 'scroll-s6-b1',
          title: '第一回：景阳冈',
          content: '武松在"三碗不过冈"酒店连喝十八碗，不听劝阻执意过冈...',
          tags: ['武侠', '热血'],
          heatModifier: 15,
        },
        {
          id: 'scroll-s6-b2',
          title: '第一回：斗杀西门庆',
          content: '武松得知兄长被潘金莲和西门庆害死，在狮子楼斗杀西门庆...',
          tags: ['武侠', '复仇'],
          heatModifier: 16,
        },
      ],
    }
  ),
  createScroll(
    'sc7',
    '西厢记·张生崔莺莺',
    '张生在普救寺偶遇崔莺莺，一见钟情...',
    ['爱情', '才子佳人', '婉约'],
    '真迹',
    '轻微破损',
    '入门',
    70,
    '讲述张生与崔莺莺的爱情故事',
    '摊主：这卷是元刻本，纸张虽旧但字字珠玑',
    {
      id: 'scroll-s7',
      title: '西厢记·张生崔莺莺',
      tags: ['爱情', '才子佳人', '婉约'],
      heat: 65,
      summary: '张生与崔莺莺的爱情传奇',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s7-b1',
          title: '第一折：佛殿相逢',
          content: '张生在普救寺佛殿偶遇崔莺莺，两人四目相对，一见钟情...',
          tags: ['爱情', '相遇'],
          heatModifier: 7,
        },
        {
          id: 'scroll-s7-b2',
          title: '第一折：月下听琴',
          content: '张生在月下弹琴，莺莺在隔墙听琴，琴声倾诉相思之苦...',
          tags: ['爱情', '婉约'],
          heatModifier: 9,
        },
      ],
    }
  ),
  createScroll(
    'sc8',
    '东周列国志·烽火戏诸侯',
    '周幽王为博褒姒一笑，烽火戏诸侯...',
    ['历史', '讽刺', '谋略'],
    '真迹',
    '严重破损',
    '困难',
    180,
    '讲述周幽王亡国的历史故事',
    '摊主：这卷是从一座古墓中出土的，很多地方已经粘连在一起了',
    {
      id: 'scroll-s8',
      title: '东周列国志·烽火戏诸侯',
      tags: ['历史', '讽刺', '谋略'],
      heat: 72,
      summary: '周幽王烽火戏诸侯导致亡国的历史教训',
      isFromScroll: true,
      branches: [
        {
          id: 'scroll-s8-b1',
          title: '第一回：幽王即位',
          content: '周宣王驾崩，太子宫涅即位，是为周幽王。幽王为人暴戾寡恩...',
          tags: ['历史', '讽刺'],
          heatModifier: 6,
        },
        {
          id: 'scroll-s8-b2',
          title: '第一回：褒姒一笑',
          content: '幽王为博褒姒一笑，点燃骊山烽火，诸侯纷纷率兵勤王...',
          tags: ['历史', '讽刺'],
          heatModifier: 13,
        },
      ],
    }
  ),
]

const conditionRepairCost: Record<Scroll['condition'], number> = {
  '完好': 0,
  '轻微破损': 20,
  '严重破损': 50,
  '残缺不全': 100,
}

const difficultyRepairTime: Record<Scroll['difficulty'], number> = {
  '入门': 25,
  '进阶': 40,
  '困难': 60,
  '大师级': 85,
}

export function getRepairCost(scroll: Scroll): number {
  return conditionRepairCost[scroll.condition]
}

export function getRepairProgressPerAction(scroll: Scroll): number {
  return Math.floor(100 / difficultyRepairTime[scroll.difficulty] * 10)
}

export function getIdentifySuccessChance(scroll: Scroll, reputation: number): number {
  const difficultyBonus: Record<Scroll['difficulty'], number> = {
    '入门': 80,
    '进阶': 60,
    '困难': 40,
    '大师级': 20,
  }
  const reputationBonus = Math.floor(reputation / 10) * 5
  return Math.min(95, difficultyBonus[scroll.difficulty] + reputationBonus)
}

export function getDailyScrolls(): Scroll[] {
  const pool = [...SCROLLS]
  const result: Scroll[] = []
  for (let i = 0; i < 4 && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const scroll = { ...pool.splice(idx, 1)[0] }
    scroll.id = `${scroll.id}-${Date.now()}-${i}`
    result.push(scroll)
  }
  return result
}
