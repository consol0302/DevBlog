import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, ChevronRight, ChevronLeft, TrendingUp, TrendingDown, FileText } from 'lucide-react';

function PostListPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  

  useEffect(() => {
    if (location.pathname !== '/posts') {
      return;
    }
    fetch('https://dev-blog-opal-theta.vercel.app/list')
      .then(response => response.json())
      .then(data => {  
        if (Array.isArray(data)) {
          setAllPosts(data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // 정렬된 게시글 목록
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    
    if (sortOrder === 'desc') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  // 페이지네이션 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
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

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 정렬 변경 시 첫 페이지로
  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  // 게시글 클릭 핸들러
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // 전체 인덱스 계산 (페이지네이션을 고려한)
  const getGlobalIndex = (localIndex) => {
    return indexOfFirstPost + localIndex;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 섹션 */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              전체 아카이브 
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              모든 게시글
            </h1>
            <p className="text-lg text-gray-600">
              총 <span className="font-bold text-blue-600">{allPosts.length}</span>개의 게시글이 있습니다
            </p>
          </div>
          
          {/* 정렬 버튼 그룹 */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleSortChange('desc')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                sortOrder === 'desc'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <TrendingDown className="w-5 h-5" />
              최신순
            </button>
            
            <button
              onClick={() => handleSortChange('asc')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                sortOrder === 'asc'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              오래된순
            </button>
          </div>
        </div>

        {/* 게시글 목록 */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">아직 게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentPosts.map((post, index) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200"
                  style={{
                    animation: `fadeIn 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* 번호 뱃지 */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                        <span className="text-lg font-bold text-blue-600 group-hover:text-white transition-colors">
                          {sortOrder === 'desc' 
                            ? getGlobalIndex(index) + 1 
                            : sortedPosts.length - getGlobalIndex(index)}
                        </span>
                      </div>
                      
                      {/* 컨텐츠 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2 mt-1" />
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-1 text-sm">
                          {post.author || '개발자'}
                        </p>
                        
                        {/* 태그와 날짜를 한 줄로 */}
                        <div className="flex flex-wrap items-center gap-3">
                          {post.tag && post.tag.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tag.slice(0, 3).map((tags, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                  #{tags}
                                </span>
                              ))}
                              {post.tag.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                  +{post.tag.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">
                              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* 이전 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 페이지 번호들 */}
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNumber
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                        : 'text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* 다음 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default PostListPage;