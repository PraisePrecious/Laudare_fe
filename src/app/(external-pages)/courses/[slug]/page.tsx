// app/courses/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { 
  ArrowLeft, BookOpen, Clock, Users, Star, 
  CheckCircle, Play, BarChart3, Award, 
  TrendingUp, Calendar, User, Tag, 
  Target, FileText, ChevronRight, Video,
  Loader2, AlertCircle, Shield, Globe,
  Bookmark, Share2, Download, RefreshCw,
  ThumbsUp, MessageCircle, Eye
} from 'lucide-react';
import { CourseCatalog, UserCourse } from '@/lib/types';

const SingleCoursePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const slug = params.slug as string;
  
  const [course, setCourse] = useState<CourseCatalog | null>(null);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews' | 'enrollments'>('overview');
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [showAllPrerequisites, setShowAllPrerequisites] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadCourseData();
    }
  }, [slug, user]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      
      // Get course details
      const courseRes = await api.getCourseBySlug(slug);
      setCourse(courseRes.data);
      
      // If user is logged in, get their progress
      if (user) {
        try {
          const userCoursesRes = await api.getUserCourses(user.id);
          const userCourseData = userCoursesRes.data.find(c => c.courseSlug === slug);
          setUserCourse(userCourseData || null);
        } catch (error) {
          console.error('Failed to load user course data:', error);
        }
      }
      
      // Load recent enrollments
      try {
        const enrollmentsRes = await api.getCourseEnrollments(slug);
        setRecentEnrollments(enrollmentsRes.data.enrollments);
      } catch (error) {
        console.error('Failed to load enrollments:', error);
      }
      
    } catch (error) {
      console.error('Failed to load course:', error);
      // Course not found, could redirect to 404
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setEnrolling(true);
      const enrollment = await api.enrollCourse(user.id, {
        courseSlug: slug,
        category: course?.category,
        difficulty: course?.difficulty,
      });
      
      setUserCourse(enrollment.data);
      router.push(`/courses/${slug}/learn`);
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleContinue = () => {
    if (userCourse) {
      router.push(`/courses/${slug}/learn`);
    }
  };

  const handleLessonClick = (lesson: any) => {
    if (isEnrolled) {
      // Navigate to the lesson page
      router.push(`/courses/${slug}/learn/${lesson.id}`);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'quiz': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getLessonColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleDuration = (module: any) => {
    if (module.duration) return module.duration;
    if (module.lessons) {
      return module.lessons.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0);
    }
    return 0;
  };

  const getModuleLessonCount = (module: any) => {
    return module.lessons?.length || 0;
  };

  const getModuleQuizCount = (module: any) => {
    return module.lessons?.filter((lesson: any) => lesson.type === 'quiz').length || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const isEnrolled = !!userCourse;
  const progress = userCourse?.progress || 0;
  const completed = userCourse?.completed || false;
  const hasCurriculum = course.curriculum && course.curriculum.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/courses')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {course.category}
                </span>
                {isEnrolled && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enrolled
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              
              <p className="text-white/90 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>By {course.instructor || 'Expert Instructor'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Updated {new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>English</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Action Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl p-6">
                {course.thumbnail && (
                  <div className="mb-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Progress Section for enrolled users */}
                {isEnrolled && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Your progress</span>
                      <span className="font-bold text-blue-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {completed && (
                      <div className="mt-2 flex items-center text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Course Completed!
                      </div>
                    )}
                  </div>
                )}
                
                {/* Course Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold">{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>Lessons</span>
                    </div>
                    <span className="font-semibold">{course.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span>Quizzes</span>
                    </div>
                    <span className="font-semibold">{course.totalQuizzes}</span>
                  </div>
                </div>
                
                {/* Action Button */}
                {isEnrolled ? (
                  <button
                    onClick={handleContinue}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center"
                  >
                    {completed ? 'Review Course' : 'Continue Learning'}
                    <Play className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-75"
                  >
                    {enrolling ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                        Enrolling...
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </button>
                )}
                
                {/* Additional Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Bookmark className="w-4 h-4 mr-1" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Share2 className="w-4 h-4 mr-1" />
                    <span className="text-sm">Share</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <Download className="w-4 h-4 mr-1" />
                    <span className="text-sm">Resources</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'curriculum'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'enrollments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Enrollments
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What You'll Learn */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                      course.learningOutcomes.map((outcome: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))
                    ) : (
                      // Fallback to default outcomes if none are defined
                      [
                        'Master the fundamentals of the subject',
                        'Build real-world projects',
                        'Solve practical problems',
                        'Prepare for advanced topics',
                        'Gain industry-relevant skills',
                        'Earn a certificate of completion',
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Course Content Preview */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                    <div className="text-sm text-gray-600">
                      {course.totalLessons} lessons • {course.totalQuizzes} quizzes
                    </div>
                  </div>
                  
                  {hasCurriculum ? (
                    <div className="space-y-4">
                      {course.curriculum?.slice(0, 3).map((module: any, moduleIndex: number) => (
                        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">
                              {module.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {getModuleLessonCount(module)} lessons • {getModuleQuizCount(module)} quizzes • {formatDuration(getModuleDuration(module))}
                            </p>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {module.lessons?.slice(0, 3).map((lesson: any, lessonIndex: number) => (
                              <div key={lesson.id} className="px-4 py-3 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getLessonColor(lesson.type)}`}>
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {lesson.title}
                                      </h4>
                                      <p className="text-sm text-gray-500">{lesson.duration || 0} minutes • {lesson.type}</p>
                                    </div>
                                  </div>
                                  {isEnrolled && lessonIndex === 0 && (
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                      Completed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {course.curriculum && course.curriculum.length > 3 && (
                        <button 
                          onClick={() => setActiveTab('curriculum')}
                          className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Show all {course.curriculum.length} modules
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Course content is being prepared.</p>
                    </div>
                  )}
                </div>

                {/* Prerequisites */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                    <div className="flex flex-wrap gap-3">
                      {course.prerequisites.slice(0, showAllPrerequisites ? undefined : 5).map((prereq, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg font-medium border border-blue-100"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                    {course.prerequisites.length > 5 && (
                      <button
                        onClick={() => setShowAllPrerequisites(!showAllPrerequisites)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {showAllPrerequisites ? 'Show less' : `Show all ${course.prerequisites.length} prerequisites`}
                      </button>
                    )}
                  </div>
                )}

                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Topics Covered</h2>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.slice(0, showAllTags ? undefined : 10).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {course.tags.length > 10 && (
                      <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {showAllTags ? 'Show less' : `Show all ${course.tags.length} topics`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Detailed Curriculum</h2>
                  <div className="text-sm text-gray-600">
                    {course.totalLessons} lessons • {course.totalQuizzes} quizzes • {formatDuration(course.duration)}
                  </div>
                </div>
                
                {hasCurriculum ? (
                  <div className="space-y-6">
                    {course.curriculum?.map((module: any, moduleIndex: number) => {
                      const moduleDuration = getModuleDuration(module);
                      const lessonCount = getModuleLessonCount(module);
                      const quizCount = getModuleQuizCount(module);
                      const isExpanded = expandedModule === module.id;
                      
                      return (
                        <div key={module.id} className="border border-gray-200 rounded-lg">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{module.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {lessonCount} lessons • {quizCount} quizzes • {formatDuration(moduleDuration)} • 
                                  {moduleIndex === 0 ? ' 15% of total' : ` ${Math.round((moduleDuration / (course.duration || 1)) * 100)}% of total`}
                                </p>
                              </div>
                              <button
                                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </button>
                            </div>
                          </div>
                          
                          {isExpanded && module.lessons && module.lessons.length > 0 && (
                            <div className="divide-y divide-gray-200">
                              {module.lessons.map((lesson: any, lessonIndex: number) => (
                                <div 
                                  key={lesson.id} 
                                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                                  onClick={() => handleLessonClick(lesson)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getLessonColor(lesson.type)}`}>
                                        {getLessonIcon(lesson.type)}
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900">
                                          {lesson.title}
                                        </h4>
                                        <div className="flex items-center space-x-4 mt-1">
                                          <span className="text-sm text-gray-500">
                                            {lesson.type === 'video' ? 'Video' : 
                                             lesson.type === 'quiz' ? 'Quiz' : 'Text'} • {lesson.duration || 0} min
                                          </span>
                                          {isEnrolled && lessonIndex === 0 && (
                                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                                              Completed
                                            </span>
                                          )}
                                          {lessonIndex > 0 && (
                                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                              Required
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {lessonIndex === 0 && isEnrolled ? (
                                      <button className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200">
                                        Review
                                      </button>
                                    ) : (
                                      <button className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200">
                                        {isEnrolled ? 'Start' : 'Preview'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {module.lessons?.some((lesson: any) => lesson.type === 'quiz') && (
                            <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Award className="w-5 h-5 text-yellow-600 mr-3" />
                                  <div>
                                    <h4 className="font-semibold text-yellow-800">Module Quizzes</h4>
                                    <p className="text-sm text-yellow-700">
                                      {quizCount} quizzes • {formatDuration(
                                        module.lessons
                                          ?.filter((l: any) => l.type === 'quiz')
                                          .reduce((sum: number, l: any) => sum + (l.duration || 0), 0)
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                                  Required: 80% to pass
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Curriculum Not Available</h3>
                    <p className="text-gray-500 mt-2">This course curriculum is being prepared by the instructor.</p>
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Course Certificate</h4>
                      <p className="text-sm text-gray-600">Complete all modules and quizzes to earn your certificate</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">4.8 • 245 reviews</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90">
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            JD
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">John Doe</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 ml-2">2 weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <ThumbsUp className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-gray-700">
                        This course was absolutely fantastic! The instructor explains complex concepts in a way that's easy to understand. The projects were challenging but rewarding.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span className="text-sm">Helpful (42)</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}

            {activeTab === 'enrollments' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recent Enrollments</h2>
                    <p className="text-gray-600 mt-1">{recentEnrollments.length} active learners this week</p>
                  </div>
                  <button
                    onClick={loadCourseData}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentEnrollments.length > 0 ? (
                    recentEnrollments.map((enrollment, index) => (
                      <div key={enrollment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {enrollment.user.firstName?.charAt(0) || 'U'}
                            {enrollment.user.lastName?.charAt(0) || ''}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {enrollment.user.firstName} {enrollment.user.lastName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {enrollment.user.role} • Joined {new Date(enrollment.enrolled_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {enrollment.progress}%
                          </div>
                          <div className="text-sm text-gray-500">
                            {enrollment.completed ? 'Completed' : 'In progress'}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No enrollments yet</h3>
                      <p className="text-gray-500 mt-1">Be the first to enroll in this course!</p>
                    </div>
                  )}
                </div>
                
                {recentEnrollments.length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Enrollment Statistics</h4>
                        <p className="text-sm text-gray-600">Active learners and completion rates</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-gray-600">Completion rate</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Avg. Progress</div>
                        <div className="text-xl font-bold text-gray-900">72%</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Avg. Time</div>
                        <div className="text-xl font-bold text-gray-900">18h</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructor Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {course.instructor?.charAt(0) || 'E'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {course.instructor || 'Expert Instructor'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Senior Developer & Educator</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">4.9/5</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">2.5K students</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                With over 10 years of industry experience, our instructor has helped thousands of students master this subject through clear explanations and practical examples.
              </p>
              <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>

            {/* Course Features */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Course Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-5 h-5 mr-3" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-3" />
                  <span>Real-world projects</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <span>Q&A support</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Courses</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((related) => (
                  <div key={related} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                      C{related}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        Advanced {course.category} Concepts
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded mr-2">
                          Advanced
                        </span>
                        <span className="text-xs text-gray-500">12h</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                View all related courses →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCoursePage;