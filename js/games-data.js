/**
 * Monster Survivors Games - 游戏数据
 * 这个文件包含所有游戏的数据，便于单独维护和添加新游戏
 */

// 立即设置全局游戏数据变量
window.gamesData = [
  {
    id: 1,
    title: "Monster Survivors",
    description: "Survive endless waves of monsters in this action-packed roguelike game.",
    imageUrl: "images/monster-survivors.jpg",
    category: "action",
    iframe: "https://html-classic.itch.zone/html/7876385/VanguardMonstersWeb/index.html?v=1732313646",
    aspectRatio: 0.75, // 4:3比例
    details: {
      genre: "Roguelike, Action",
      players: "Single Player",
      controls: "Keyboard/Mouse",
      releaseDate: "2023",
      developer: "Monster Games",
      features: ["Endless Gameplay", "Character Progression", "Multiple Weapons"]
    }
  },
  {
    id: 2,
    title: "Zombie Defense",
    description: "Build defenses and survive the zombie apocalypse in this strategy game.",
    imageUrl: "images/zombie-defense.jpg",
    category: "strategy",
    iframe: "https://html-classic.itch.zone/html/9272800/index.html",
    aspectRatio: 0.6, // 5:3比例
    details: {
      genre: "Strategy, Defense",
      players: "Single Player",
      controls: "Mouse",
      releaseDate: "2023",
      developer: "GamesOnline Studios",
      features: ["Tower Defense", "Resource Management", "Wave-based Combat"]
    }
  },
  {
    id: 3,
    title: "Space Explorer",
    description: "Explore the galaxy, mine resources, and battle alien species in this space adventure.",
    imageUrl: "images/space-explorer.jpg",
    category: "adventure",
    iframe: "https://html-classic.itch.zone/html/13001608/index.html",
    aspectRatio: 0.5625, // 16:9比例
    details: {
      genre: "Adventure, Exploration",
      players: "Single Player",
      controls: "Keyboard/Mouse",
      releaseDate: "2024",
      developer: "Cosmic Games",
      features: ["Open World", "Resource Collection", "Ship Upgrades"]
    }
  },
  {
    id: 4,
    title: "Puzzle Master",
    description: "Challenge your brain with increasingly difficult puzzles in various environments.",
    imageUrl: "images/puzzle-master.jpg",
    category: "puzzle",
    iframe: "https://v6p9d9t4.ssl.hwcdn.net/html/1677254/index.html",
    aspectRatio: 0.8, // 5:4比例
    details: {
      genre: "Puzzle, Brain Teaser",
      players: "Single Player",
      controls: "Mouse",
      releaseDate: "2023",
      developer: "Mind Games",
      features: ["100+ Puzzles", "Progressive Difficulty", "Time Challenge Mode"]
    }
  },
  {
    id: 5,
    title: "Racing Challenge",
    description: "Race against opponents on challenging tracks in various vehicles.",
    imageUrl: "images/racing-challenge.jpg",
    category: "racing",
    iframe: "https://v6p9d9t4.ssl.hwcdn.net/html/3252641/index.html",
    aspectRatio: 0.5625, // 16:9比例
    details: {
      genre: "Racing, Arcade",
      players: "Single Player",
      controls: "Keyboard",
      releaseDate: "2024",
      developer: "Speed Games",
      features: ["Multiple Tracks", "Vehicle Upgrades", "Time Trials"]
    }
  },
  {
    id: 6,
    title: "Dungeon Crawler",
    description: "Explore dungeons, defeat monsters, and collect loot in this RPG adventure.",
    imageUrl: "images/dungeon-crawler.jpg",
    category: "rpg",
    iframe: "https://v6p9d9t4.ssl.hwcdn.net/html/3252641/index.html",
    aspectRatio: 0.6667, // 3:2比例
    details: {
      genre: "RPG, Dungeon Crawler",
      players: "Single Player",
      controls: "Keyboard/Mouse",
      releaseDate: "2023",
      developer: "Fantasy Games",
      features: ["Procedural Dungeons", "Character Customization", "Epic Boss Battles"]
    }
  }
]; 