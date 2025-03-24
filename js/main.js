/**
 * Monster Survivors Games - Main JavaScript
 * 负责网站交互、数据处理和动态内容加载
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 检查游戏数据是否可用
  if (!window.gamesData) {
    console.error("错误: 游戏数据未加载，请刷新页面重试。");
    return;
  }
  
  // 根据当前页面初始化相应功能
  const currentPath = window.location.pathname;
  
  // 检查是否在主页或游戏详情页
  if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
    // 在主页上初始化游戏列表和其他所有功能
    initializeGamesListPage();
    initializeSimilarGames();
  } else if (currentPath.includes('game-details.html')) {
    // 在游戏详情页上初始化游戏详情
    initializeGameDetailsPage();
  }
  
  // 确保所有页面共享的功能也被初始化
  initializeSharedFeatures();
  
  // 处理URL中的hash，自动滚动到对应区域
  handleHashNavigation();
});

/**
 * 处理URL中的hash导航
 */
function handleHashNavigation() {
  // 检查URL中是否有hash
  if(window.location.hash) {
    // 获取hash值，去掉#号
    const targetId = window.location.hash.substring(1);
    
    // 查找对应的元素
    const targetElement = document.getElementById(targetId);
    
    // 如果元素存在，滚动到该元素
    if(targetElement) {
      // 延迟一点滚动，确保页面完全加载
      setTimeout(() => {
        targetElement.scrollIntoView({behavior: 'smooth'});
      }, 100);
    }
  }
}

/**
 * 初始化游戏列表页的功能
 */
function initializeGamesListPage() {
  const gamesGrid = document.getElementById('games-grid');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const filterButtons = document.querySelectorAll('.filter-button');
  const paginationContainer = document.getElementById('pagination');
  
  // 如果不在游戏列表区域，则返回
  if (!gamesGrid) {
    return;
  }
  
  // 确保游戏数据可用
  if (!window.gamesData || !window.gamesData.length) {
    gamesGrid.innerHTML = '<div class="no-results">游戏数据加载失败，请刷新页面重试。</div>';
    return;
  }
  
  let currentPage = 1;
  const gamesPerPage = 6;
  let filteredGames = [...window.gamesData];
  
  // 检查URL参数是否有搜索词
  const urlParams = new URLSearchParams(window.location.search);
  const searchTermFromURL = urlParams.get('search');
  
  // 如果URL中有搜索词，自动进行搜索
  if (searchTermFromURL && searchInput) {
    searchInput.value = searchTermFromURL;
    filterGames(searchTermFromURL);
    
    // 滚动到游戏列表区域
    const gamesCollectionSection = document.getElementById('games-collection');
    if (gamesCollectionSection) {
      setTimeout(() => {
        gamesCollectionSection.scrollIntoView({behavior: 'smooth'});
      }, 100);
    }
  }
  
  // 渲染游戏列表
  function renderGames() {
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const paginatedGames = filteredGames.slice(startIndex, endIndex);
    
    gamesGrid.innerHTML = '';
    
    if (paginatedGames.length === 0) {
      gamesGrid.innerHTML = '<div class="no-results">没有找到符合条件的游戏。</div>';
      return;
    }
    
    paginatedGames.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.className = 'game-card';
      gameCard.innerHTML = `
        <img src="${game.imageUrl}" alt="${game.title}" class="game-card-image">
        <div class="game-card-content">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-description">${game.description}</p>
          <a href="games/game-details.html?id=${game.id}" class="game-card-button">开始游戏</a>
        </div>
      `;
      gamesGrid.appendChild(gameCard);
    });
    
    // 更新分页
    updatePagination();
  }
  
  // 更新分页控件
  function updatePagination() {
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
    paginationContainer.innerHTML = '';
    
    // 上一页按钮
    const prevButton = document.createElement('div');
    prevButton.className = 'pagination-button';
    prevButton.innerHTML = '&laquo;';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderGames();
      }
    });
    paginationContainer.appendChild(prevButton);
    
    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('div');
      pageButton.className = `pagination-button ${i === currentPage ? 'active' : ''}`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderGames();
      });
      paginationContainer.appendChild(pageButton);
    }
    
    // 下一页按钮
    const nextButton = document.createElement('div');
    nextButton.className = 'pagination-button';
    nextButton.innerHTML = '&raquo;';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderGames();
      }
    });
    paginationContainer.appendChild(nextButton);
  }
  
  // 搜索功能
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      filterGames(searchTerm);
    });
    
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterGames(searchTerm);
      }
    });
  }
  
  // 分类过滤功能
  if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach(button => {
      const category = button.dataset.category;
      
      button.addEventListener('click', function() {
        // 更新按钮激活状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 如果是"all"类别，显示所有游戏，否则按类别过滤
        if (category === 'all') {
          filteredGames = [...window.gamesData];
        } else {
          filteredGames = window.gamesData.filter(game => game.category === category);
        }
        
        currentPage = 1; // 重置为第一页
        renderGames();
      });
    });
  }
  
  // 搜索过滤功能
  function filterGames(searchTerm) {
    if (!searchTerm) {
      // 如果搜索词为空，恢复显示所有游戏
      filteredGames = [...window.gamesData];
    } else {
      filteredGames = window.gamesData.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.description.toLowerCase().includes(searchTerm)
      );
    }
    
    currentPage = 1; // 重置为第一页
    renderGames();
  }
  
  // 初始渲染
  renderGames();
}

/**
 * 初始化游戏详情页的功能
 */
function initializeGameDetailsPage() {
  // 从URL获取游戏ID
  const params = new URLSearchParams(window.location.search);
  const gameId = parseInt(params.get('id'));
  
  if (isNaN(gameId)) {
    // 无效的游戏ID，重定向到主页
    window.location.href = '../index.html#games-collection';
    return;
  }
  
  // 查找对应的游戏数据
  const game = window.gamesData.find(g => g.id === gameId);
  
  if (!game) {
    // 游戏不存在，重定向到主页
    window.location.href = '../index.html#games-collection';
    return;
  }
  
  // 更新页面标题
  document.title = `${game.title} - Monster Survivors Games`;
  
  // 更新游戏详情内容
  const gameTitle = document.getElementById('game-title');
  const gameDescription = document.getElementById('game-description');
  const gameIframe = document.getElementById('game-iframe');
  const gameDetails = document.getElementById('game-details');
  
  if (gameTitle) gameTitle.textContent = game.title;
  if (gameDescription) gameDescription.textContent = game.description;
  if (gameIframe) gameIframe.src = game.iframe;
  
  // 填充游戏详情
  if (gameDetails) {
    let detailsHTML = '';
    
    detailsHTML += `
      <div class="game-info-item">
        <div class="game-info-item-title">Genre</div>
        <div>${game.details.genre}</div>
      </div>
      <div class="game-info-item">
        <div class="game-info-item-title">Players</div>
        <div>${game.details.players}</div>
      </div>
      <div class="game-info-item">
        <div class="game-info-item-title">Controls</div>
        <div>${game.details.controls}</div>
      </div>
      <div class="game-info-item">
        <div class="game-info-item-title">Release Date</div>
        <div>${game.details.releaseDate}</div>
      </div>
      <div class="game-info-item">
        <div class="game-info-item-title">Developer</div>
        <div>${game.details.developer}</div>
      </div>
    `;
    
    // 添加特性列表
    detailsHTML += `
      <div class="game-info-item">
        <div class="game-info-item-title">Features</div>
        <ul>
          ${game.details.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    `;
    
    gameDetails.innerHTML = detailsHTML;
  }
  
  // 初始化相似游戏展示
  initializeSimilarGames(game.category, game.id);
}

/**
 * 初始化相似游戏展示
 * @param {string} category - 游戏类别，用于筛选相似游戏
 * @param {number} currentGameId - 当前游戏ID，避免在相似游戏中显示自己
 */
function initializeSimilarGames(category, currentGameId) {
  const similarGamesContainer = document.getElementById('similar-games');
  if (!similarGamesContainer) return;
  
  let similarGames = [];
  
  if (category) {
    // 如果提供了类别，则按类别筛选相似游戏
    similarGames = window.gamesData.filter(game => game.category === category && game.id !== currentGameId);
  } else {
    // 否则随机选择几个游戏
    similarGames = [...window.gamesData].sort(() => 0.5 - Math.random()).slice(0, 3);
  }
  
  // 限制最多显示3个相似游戏
  similarGames = similarGames.slice(0, 3);
  
  // 清空容器
  similarGamesContainer.innerHTML = '';
  
  if (similarGames.length === 0) {
    similarGamesContainer.innerHTML = '<div class="no-results">没有找到相似游戏。</div>';
    return;
  }
  
  // 添加相似游戏卡片
  similarGames.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.innerHTML = `
      <img src="${game.imageUrl.includes('../') ? game.imageUrl : '../' + game.imageUrl}" alt="${game.title}" class="game-card-image">
      <div class="game-card-content">
        <h3 class="game-card-title">${game.title}</h3>
        <p class="game-card-description">${game.description}</p>
        <a href="game-details.html?id=${game.id}" class="game-card-button">开始游戏</a>
      </div>
    `;
    similarGamesContainer.appendChild(gameCard);
  });
}

/**
 * 初始化所有页面共享的功能
 */
function initializeSharedFeatures() {
  // 可以在这里添加所有页面共享的功能，如导航菜单的响应式切换等
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
  
  // 添加导航链接平滑滚动效果
  const navLinks = document.querySelectorAll('nav a[href^="#"], .footer-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
} 