import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Clock, MessageCircle, Send } from 'lucide-react';

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // content JSON 문자열을 파싱하는 함수
  const parseContent = (content) => {
    if (!content) return '';
    
    try {
      // JSON 문자열을 객체로 파싱
      const contentObj = typeof content === 'string' 
        ? JSON.parse(content) 
        : content;
      
      // 객체의 모든 값을 추출해서 합치기
      return Object.values(contentObj).join('\n\n');
    } catch (e) {
      // 파싱 실패시 원본 반환
      return typeof content === 'string' ? content : '';
    }
  };

  useEffect(() => {
      // 게시글 상세 정보 가져오기
      fetch(`http://dev-blog-opal-theta.vercel.app/postData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "postId": Number(postId)
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('게시글을 찾을 수 없습니다.');
          }
          return response.json();
        })
        .then(data => {
          setPost(data[0][0]); // post
          setComments(Array.isArray(data[1]) ? data[1] : []); // comment
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error.message);
          setLoading(false);
        });
    }, [postId]);

  // comment write
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/sendComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "target": Number(postId),
          "content": newComment
        })
      });

      if (!response.ok) {
        throw new Error('댓글 작성에 실패했습니다.');
      }

      const result = await response.json();
      
      // 댓글 목록 새로고침 (또는 새 댓글을 직접 추가)
      // 방법 1: 전체 데이터 다시 불러오기
      const refreshResponse = await fetch(`http://localhost:8000/postData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "postId": Number(postId)
        })
      });
      
      const refreshData = await refreshResponse.json();
      setComments(Array.isArray(refreshData[1]) ? refreshData[1] : []);
      
      // 입력창 초기화
      setNewComment('');
      alert('댓글이 작성되었습니다!');
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || '게시글을 찾을 수 없습니다.'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 뒤로 가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          <span>뒤로 가기</span>
        </button>

        {/* 게시글 내용 */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* 헤더 */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author || '개발자'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{new Date(post.created_at).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            {/* 태그 */}
            {post.tag && post.tag.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tag.map((tagItem, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-4 h-4" />
                    {tagItem}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 본문 - Markdown 렌더링 */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
              {parseContent(post.content) ? (
                <ReactMarkdown>{parseContent(post.content)}</ReactMarkdown>
              ) : (
                <p className="text-gray-500 italic">내용이 없습니다.</p>
              )}
            </div>
          </div>
        </article>

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 댓글 헤더 */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                댓글 <span className="text-blue-600">{comments.length}</span>
              </h2>
            </div>
          </div>

          {/* 댓글 작성 폼 */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성해보세요..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                rows="4"
                disabled={isSubmitting}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? '작성 중...' : '댓글 작성'}
                </button>
              </div>
            </form>
          </div>

          {/* 댓글 목록 */}
          <div className="divide-y divide-gray-200">
            {comments.length === 0 ? (
              <div className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">아직 댓글이 없습니다.</p>
                <p className="text-gray-400 text-sm mt-1">첫 번째 댓글을 작성해보세요!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-4">
                    {/* 프로필 아이콘 */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* 댓글 내용 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">익명</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;