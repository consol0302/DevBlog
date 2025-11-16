import React from 'react';
import { Code, Server, Globe, Database, Github, Mail } from 'lucide-react';
import consolImage from '../assets/consol.png';
import trishestImage from '../assets/trishest.png';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600">
            프론트엔드와 백엔드에 한 발씩만 걸치고 있는 개발자들입니다.
          </p>
        </div>

        {/* 개발자 카드 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Consol */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8">
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                  <img 
                    src={consolImage} 
                    alt="Consol" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Consol
              </h2>
              <p className="text-blue-100 text-center text-sm">
                Frontend + Backend Developer
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Code className="w-5 h-5 text-blue-600" />
                  <span>프론트엔드 개발</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span>백엔드 개발</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>UI/UX 디자인</span>
                </div>
              </div>
              
              {/* Consol 연락처 */}
              <div className="space-y-2">
                <a 
                  href="https://github.com/consol0302" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  <Github className="w-4 h-4" />
                  consol0302
                </a>
                <a 
                  href="mailto:dohan018018@gmail.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  <Mail className="w-4 h-4" />
                  dohan018018@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Trishest */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8">
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img 
                      src={trishestImage} 
                      alt="Trishest" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Trishest
              </h2>
              <p className="text-purple-100 text-center text-sm">
                Backend Developer
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Server className="w-5 h-5 text-purple-600" />
                  <span>백엔드 개발</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Code className="w-5 h-5 text-purple-600" />
                  <span>API 설계</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span>데이터베이스 관리</span>
                </div>
              </div>
              
              {/* Trishest 연락처 */}
              <div className="space-y-2">
                <a 
                  href="https://github.com/choi36" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  <Github className="w-4 h-4" />
                  choi36
                </a>
                <a 
                  href="mailto:jinbum2137@gmail.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  <Mail className="w-4 h-4" />
                  jinbum2137@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-600" />
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Server className="w-6 h-6 text-purple-600" />
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'Supabase'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;