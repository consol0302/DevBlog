import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Calendar, ChevronRight, FileText, Tag, ChevronLeft } from 'lucide-react';
import PostListPage from './pages/PostListPage';
import AboutPage from './pages/AboutPage';
import PostDetailPage from './pages/PostDetailPage';
import './App.css';

// 메인 콘텐츠 컴포넌트 (Router 내부에서 사용)
function MainContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    fetch('https://dev-blog-opal-theta.vercel.app/list')
      .then(response => response.json())
      .then(data => {
        console.log('받은 데이터:', data);
        
        if (Array.isArray(data)) {
          setAllPosts(data);
          
          const sorted = [...data].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestPosts(sorted.slice(0, 5));
        }
      })
      .catch(error => console.error('Error:', error));
  }, [location.pathname]); // location.pathname을 dependency에 추가

  // 검색 기능 구현
  useEffect(() => {
    // 검색어나 검색 타입이 변경되면 페이지를 1로 초기화
    setCurrentPage(1);

    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    const filtered = allPosts.filter(post => {
      if (searchType === 'title') {
        // 제목으로 검색
        return post.title && post.title.toLowerCase().includes(query);
      } else {
        // 태그로 검색
        return post.tag && post.tag.some(tag => 
          tag.toLowerCase().includes(query)
        );
      }
    });

    // 검색 결과도 최신순으로 정렬
    const sortedFiltered = filtered.sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    setFilteredPosts(sortedFiltered);
  }, [searchQuery, searchType, allPosts]);

  // 표시할 게시글 결정 (검색 중이면 검색 결과, 아니면 최근 게시글)
  const displayPosts = searchQuery ? filteredPosts : latestPosts;

  // 페이지네이션 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(displayPosts.length / postsPerPage);

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 현재 페이지 주변의 페이지만 표시
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  DevBlog
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">홈</Link>
              <Link to="/posts" className="text-gray-700 hover:text-blue-600 transition">글 목록</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">소개</Link>
            </div>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>홈</Link>
              <Link to="/posts" className="block py-2 text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>글 목록</Link>
              <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>소개</Link>
            </div>
          )}
        </nav>
      </header>

      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={
          <>
            {/* Search Section */}
            <section className="bg-white border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    무엇을 찾고 계신가요? 
                  </h2>
                  
                  <div className="space-y-4">
                    {/* 검색 타입 선택 */}
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setSearchType('title');
                          setSearchQuery('');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                          searchType === 'title'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        제목 검색
                      </button>
                      <button
                        onClick={() => {
                          setSearchType('tag');
                          setSearchQuery('');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                          searchType === 'tag'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Tag className="w-4 h-4" />
                        태그 검색
                      </button>
                    </div>

                    {/* 검색 바 */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={searchType === 'title' ? '제목으로 검색...' : '태그로 검색...'}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                      />
                    </div>
                    
                    {searchQuery && (
                      <p className="text-sm text-gray-600 text-center">
                        {filteredPosts.length}개의 글을 찾았습니다
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content - Centered Posts */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {searchQuery ? '검색 결과' : '최근 게시글'}
              </h3>
              
              {displayPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchQuery ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6">
                    {currentPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handlePostClick(post.id)}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition flex-1">
                              {post.title}
                            </h3>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition flex-shrink-0 mt-1" />
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.author || '개발자'}
                          </p>
                          
                          {post.tag && post.tag.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tag.map((tags, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                                >
                                  #{tags}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 페이지네이션 - 검색 중일 때만 표시 */}
                  {searchQuery && (
                    <div className="flex justify-center items-center gap-3 mt-12">
                      {/* 이전 버튼 */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition ${
                          currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* 페이지 번호들 */}
                      {getPageNumbers().map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      {/* 다음 버튼 */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition ${
                          currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        } />

        {/* 다른 페이지들 */}
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

// App 컴포넌트 (Router만 포함)
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;