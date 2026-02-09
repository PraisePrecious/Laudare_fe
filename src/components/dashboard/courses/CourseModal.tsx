// 'use client';

// import React, { useState } from 'react';
// import { Loader2, Plus, X } from 'lucide-react';
// import { CourseCatalog } from '@/lib/types';

// interface CourseModalProps {
//   course: CourseCatalog | null;
//   onSubmit: (data: any) => void;
//   loading: boolean;
//   onClose: () => void;
// }

// const CourseModal: React.FC<CourseModalProps> = ({ course, onSubmit, loading, onClose }) => {
//   const [formData, setFormData] = useState({
//     slug: course?.slug || '',
//     title: course?.title || '',
//     description: course?.description || '',
//     category: course?.category || 'Programming',
//     difficulty: course?.difficulty || 'Beginner',
//     duration: course?.duration || 60,
//     totalQuizzes: course?.totalQuizzes || 5,
//     totalLessons: course?.totalLessons || 10,
//     instructor: course?.instructor || '',
//     prerequisites: course?.prerequisites || [],
//     tags: course?.tags || [],
//     thumbnail: course?.thumbnail || '',
//   });

//   const [newTag, setNewTag] = useState('');
//   const [newPrerequisite, setNewPrerequisite] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const addTag = () => {
//     if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
//       setFormData({
//         ...formData,
//         tags: [...formData.tags, newTag.trim()],
//       });
//       setNewTag('');
//     }
//   };

//   const removeTag = (tag: string) => {
//     setFormData({
//       ...formData,
//       tags: formData.tags.filter(t => t !== tag),
//     });
//   };

//   const addPrerequisite = () => {
//     if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
//       setFormData({
//         ...formData,
//         prerequisites: [...formData.prerequisites, newPrerequisite.trim()],
//       });
//       setNewPrerequisite('');
//     }
//   };

//   const removePrerequisite = (prereq: string) => {
//     setFormData({
//       ...formData,
//       prerequisites: formData.prerequisites.filter(p => p !== prereq),
//     });
//   };

//   return (
//     <div className="fixed z-50 bg-gray-400/50 inset-0  overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        
//         {/* Modal panel */}
//         <div className="inline-block align-bottom z-50 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
//           <div className="bg-white px-6 pt-6 pb-6 sm:p-8">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {course ? 'Edit Course' : 'Create New Course'}
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   {course ? 'Update course details' : 'Add a new course to your catalog'}
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-400" />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Slug */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Course Slug *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.slug}
//                     onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                     placeholder="intro-python"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">Unique identifier for the course</p>
//                 </div>
                
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Course Title *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                     placeholder="Introduction to Python"
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows={4}
//                   required
//                   placeholder="A comprehensive introduction to Python programming..."
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Programming">Programming</option>
//                     <option value="Mathematics">Mathematics</option>
//                     <option value="Science">Science</option>
//                     <option value="Web Development">Web Development</option>
//                     <option value="Data Science">Data Science</option>
//                     <option value="Business">Business</option>
//                     <option value="Design">Design</option>
//                     <option value="Language">Language</option>
//                   </select>
//                 </div>
                
//                 {/* Difficulty */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Difficulty *
//                   </label>
//                   <select
//                     value={formData.difficulty}
//                     onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 </div>
                
//                 {/* Instructor */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Instructor
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.instructor}
//                     onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Duration (minutes) *
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
                
//                 {/* Total Lessons */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Total Lessons *
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={formData.totalLessons}
//                     onChange={(e) => setFormData({ ...formData, totalLessons: parseInt(e.target.value) })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
                
//                 {/* Total Quizzes */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Total Quizzes *
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={formData.totalQuizzes}
//                     onChange={(e) => setFormData({ ...formData, totalQuizzes: parseInt(e.target.value) })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Thumbnail URL */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Thumbnail URL
//                 </label>
//                 <input
//                   type="url"
//                   value={formData.thumbnail}
//                   onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 {formData.thumbnail && (
//                   <div className="mt-2">
//                     <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                       <img 
//                         src={formData.thumbnail} 
//                         alt="Thumbnail preview"
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em">No image</text></svg>';
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags
//                 </label>
//                 <div className="flex items-center space-x-2 mb-3">
//                   <input
//                     type="text"
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Add a tag (e.g., python, programming)"
//                   />
//                   <button
//                     type="button"
//                     onClick={addTag}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 min-h-12 p-2 border border-gray-200 rounded-lg bg-gray-50">
//                   {formData.tags.length === 0 ? (
//                     <span className="text-sm text-gray-400">No tags added yet</span>
//                   ) : (
//                     formData.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-sm shadow-sm"
//                       >
//                         {tag}
//                         <button
//                           type="button"
//                           onClick={() => removeTag(tag)}
//                           className="ml-2 text-gray-400 hover:text-red-500"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* Prerequisites */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Prerequisites
//                 </label>
//                 <div className="flex items-center space-x-2 mb-3">
//                   <input
//                     type="text"
//                     value={newPrerequisite}
//                     onChange={(e) => setNewPrerequisite(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Add a prerequisite (e.g., basic-math)"
//                   />
//                   <button
//                     type="button"
//                     onClick={addPrerequisite}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 min-h-12 p-2 border border-gray-200 rounded-lg bg-gray-50">
//                   {formData.prerequisites.length === 0 ? (
//                     <span className="text-sm text-gray-400">No prerequisites required</span>
//                   ) : (
//                     formData.prerequisites.map((prereq, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
//                       >
//                         {prereq}
//                         <button
//                           type="button"
//                           onClick={() => removePrerequisite(prereq)}
//                           className="ml-2 text-blue-500 hover:text-blue-700"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
          
//           {/* Modal Footer */}
//           <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-base font-medium text-white hover:opacity-90 focus:outline-none disabled:opacity-75"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   {course ? 'Updating...' : 'Creating...'}
//                 </>
//               ) : (
//                 <>
//                   {course ? 'Update Course' : 'Create Course'}
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:opacity-75"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>


//         {/* Background overlay */}
//         <div 
//           className="fixed  bg-gray-500/50 z-10  transition-opacity" 
//           onClick={onClose}
//         />

//       </div>
//     </div>
//   );
// };

// export default CourseModal;


'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Plus, X, BookOpen, Video, FileText, BarChart3, Trash2, Edit2, ChevronUp, ChevronDown } from 'lucide-react';
import { CourseCatalog, CourseModule, CourseLesson } from '@/lib/types';

interface CourseModalProps {
  course: CourseCatalog | null;
  onSubmit: (data: any) => void;
  loading: boolean;
  onClose: () => void;
}

interface ModuleForm {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
}

interface LessonForm {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'text' | 'quiz';
  content: string;
  resourceUrl?: string;
  order: number;
  moduleId: string;
  quizId?: string;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onSubmit, loading, onClose }) => {
  const [formData, setFormData] = useState({
    slug: course?.slug || '',
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || 'Programming',
    difficulty: course?.difficulty || 'Beginner',
    duration: course?.duration || 60,
    totalQuizzes: course?.totalQuizzes || 0,
    totalLessons: course?.totalLessons || 0,
    instructor: course?.instructor || '',
    prerequisites: course?.prerequisites || [],
    tags: course?.tags || [],
    thumbnail: course?.thumbnail || '',
    curriculum: course?.curriculum || [],
  });

  const [newTag, setNewTag] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'prerequisites'>('basic');
  
  // Content Management State
  const [modules, setModules] = useState<ModuleForm[]>([]);
  const [lessons, setLessons] = useState<LessonForm[]>([]);
  const [newModule, setNewModule] = useState<Omit<ModuleForm, 'id' | 'order'>>({
    title: '',
    description: '',
    duration: 0,
  });
  const [newLesson, setNewLesson] = useState<Omit<LessonForm, 'id' | 'order'>>({
    title: '',
    description: '',
    duration: 0,
    type: 'video',
    content: '',
    resourceUrl: '',
    moduleId: '',
    quizId: '',
  });
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  useEffect(() => {
    if (course?.curriculum) {
      // Parse existing curriculum into modules and lessons
      const existingModules: ModuleForm[] = [];
      const existingLessons: LessonForm[] = [];
      
      course.curriculum.forEach((module: any, moduleIndex: number) => {
        existingModules.push({
          id: module.id || `module-${Date.now()}-${moduleIndex}`,
          title: module.title,
          description: module.description || '',
          duration: module.duration || 0,
          order: module.order || moduleIndex,
        });
        
        if (module.lessons) {
          module.lessons.forEach((lesson: any, lessonIndex: number) => {
            existingLessons.push({
              id: lesson.id || `lesson-${Date.now()}-${lessonIndex}`,
              title: lesson.title,
              description: lesson.description || '',
              duration: lesson.duration || 0,
              type: lesson.type || 'text',
              content: lesson.content || '',
              resourceUrl: lesson.resourceUrl,
              order: lesson.order || lessonIndex,
              moduleId: module.id || `module-${Date.now()}-${moduleIndex}`,
              quizId: lesson.quizId,
            });
          });
        }
      });
      
      setModules(existingModules);
      setLessons(existingLessons);
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate totals from modules and lessons
    const totalDuration = modules.reduce((sum, module) => sum + module.duration, 0);
    const totalLessons = lessons.length;
    const totalQuizzes = lessons.filter(lesson => lesson.type === 'quiz').length;
    
    // Build curriculum structure
    const curriculum = modules.map(module => ({
      ...module,
      lessons: lessons
        .filter(lesson => lesson.moduleId === module.id)
        .sort((a, b) => a.order - b.order)
        .map(({ moduleId, ...lesson }) => lesson),
    })).sort((a, b) => a.order - b.order);

    const finalData = {
      ...formData,
      duration: totalDuration,
      totalLessons,
      totalQuizzes,
      curriculum,
    };
    
    onSubmit(finalData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, newPrerequisite.trim()],
      });
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (prereq: string) => {
    setFormData({
      ...formData,
      prerequisites: formData.prerequisites.filter(p => p !== prereq),
    });
  };

  // Module Management Functions
  const addModule = () => {
    if (!newModule.title.trim()) return;
    
    const moduleId = `module-${Date.now()}`;
    const newModuleWithId: ModuleForm = {
      ...newModule,
      id: moduleId,
      order: modules.length,
    };
    
    setModules([...modules, newModuleWithId]);
    setNewModule({
      title: '',
      description: '',
      duration: 0,
    });
    
    // Update lesson moduleId if needed
    if (lessons.length === 0) {
      setNewLesson(prev => ({ ...prev, moduleId }));
    }
  };

  const updateModule = (id: string, updates: Partial<ModuleForm>) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, ...updates } : module
    ));
  };

  const deleteModule = (id: string) => {
    // Delete all lessons in this module first
    const lessonsToKeep = lessons.filter(lesson => lesson.moduleId !== id);
    setLessons(lessonsToKeep);
    
    // Delete the module
    setModules(modules.filter(module => module.id !== id));
    
    // Reorder remaining modules
    const reorderedModules = modules
      .filter(module => module.id !== id)
      .map((module, index) => ({ ...module, order: index }));
    
    setModules(reorderedModules);
  };

  const moveModule = (id: string, direction: 'up' | 'down') => {
    const index = modules.findIndex(m => m.id === id);
    if (direction === 'up' && index > 0) {
      const newModules = [...modules];
      [newModules[index], newModules[index - 1]] = [newModules[index - 1], newModules[index]];
      newModules[index].order = index;
      newModules[index - 1].order = index - 1;
      setModules(newModules);
    } else if (direction === 'down' && index < modules.length - 1) {
      const newModules = [...modules];
      [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
      newModules[index].order = index;
      newModules[index + 1].order = index + 1;
      setModules(newModules);
    }
  };

  // Lesson Management Functions
  const addLesson = () => {
    if (!newLesson.title.trim() || !newLesson.moduleId) return;
    
    const module = modules.find(m => m.id === newLesson.moduleId);
    if (!module) return;
    
    const lessonId = `lesson-${Date.now()}`;
    const newLessonWithId: LessonForm = {
      ...newLesson,
      id: lessonId,
      order: lessons.filter(l => l.moduleId === newLesson.moduleId).length,
    };
    
    // Update module duration
    updateModule(newLesson.moduleId, {
      duration: module.duration + newLesson.duration,
    });
    
    setLessons([...lessons, newLessonWithId]);
    setNewLesson({
      title: '',
      description: '',
      duration: 0,
      type: 'video',
      content: '',
      resourceUrl: '',
      moduleId: newLesson.moduleId,
      quizId: '',
    });
  };

  const updateLesson = (id: string, updates: Partial<LessonForm>) => {
    const oldLesson = lessons.find(lesson => lesson.id === id);
    if (!oldLesson) return;
    
    // If duration changed, update module duration
    if (updates.duration !== undefined && oldLesson.duration !== updates.duration) {
      const module = modules.find(m => m.id === oldLesson.moduleId);
      if (module) {
        const durationDiff = updates.duration - oldLesson.duration;
        updateModule(module.id, {
          duration: module.duration + durationDiff,
        });
      }
    }
    
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, ...updates } : lesson
    ));
  };

  const deleteLesson = (id: string) => {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    
    // Update module duration
    const module = modules.find(m => m.id === lesson.moduleId);
    if (module) {
      updateModule(module.id, {
        duration: module.duration - lesson.duration,
      });
    }
    
    // Delete the lesson
    setLessons(lessons.filter(l => l.id !== id));
    
    // Reorder lessons in the same module
    const moduleLessons = lessons
      .filter(l => l.moduleId === lesson.moduleId && l.id !== id)
      .map((lesson, index) => ({ ...lesson, order: index }));
    
    const otherLessons = lessons.filter(l => l.moduleId !== lesson.moduleId);
    setLessons([...otherLessons, ...moduleLessons]);
  };

  const moveLesson = (id: string, direction: 'up' | 'down') => {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    
    const moduleLessons = lessons
      .filter(l => l.moduleId === lesson.moduleId)
      .sort((a, b) => a.order - b.order);
    
    const index = moduleLessons.findIndex(l => l.id === id);
    
    if (direction === 'up' && index > 0) {
      const newOrder = [...moduleLessons];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      newOrder[index].order = index;
      newOrder[index - 1].order = index - 1;
      
      const otherLessons = lessons.filter(l => l.moduleId !== lesson.moduleId);
      setLessons([...otherLessons, ...newOrder]);
    } else if (direction === 'down' && index < moduleLessons.length - 1) {
      const newOrder = [...moduleLessons];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      newOrder[index].order = index;
      newOrder[index + 1].order = index + 1;
      
      const otherLessons = lessons.filter(l => l.moduleId !== lesson.moduleId);
      setLessons([...otherLessons, ...newOrder]);
    }
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

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-500/50">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Modal panel */}
        <div className="inline-block align-bottom z-50 bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-6 pt-6 pb-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {course ? 'Edit Course' : 'Create New Course'}
                </h3>
                <p className="text-gray-600 mt-1">
                  {course ? 'Update course details and content' : 'Add a new course to your catalog'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className={`py-2 px-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'basic'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('content')}
                  className={`py-2 px-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'content'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Content Management
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('prerequisites')}
                  className={`py-2 px-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'prerequisites'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Prerequisites & Tags
                </button>
              </nav>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'basic' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Slug *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="intro-python"
                      />
                      <p className="mt-1 text-xs text-gray-500">Unique identifier for the course</p>
                    </div>
                    
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="Introduction to Python"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      required
                      placeholder="A comprehensive introduction to Python programming..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Language">Language</option>
                      </select>
                    </div>
                    
                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty *
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    
                    {/* Instructor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instructor
                      </label>
                      <input
                        type="text"
                        value={formData.instructor}
                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Thumbnail URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.thumbnail && (
                      <div className="mt-2">
                        <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={formData.thumbnail} 
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em">No image</text></svg>';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Modules Section */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Modules</h3>
                    
                    {/* Add Module Form */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Module Title *
                        </label>
                        <input
                          type="text"
                          value={newModule.title}
                          onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Introduction to Python"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (min)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newModule.duration}
                          onChange={(e) => setNewModule({ ...newModule, duration: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={addModule}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add Module
                        </button>
                      </div>
                    </div>
                    
                    {/* Module Description */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Module Description
                      </label>
                      <textarea
                        value={newModule.description}
                        onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="Brief description of what this module covers..."
                      />
                    </div>
                    
                    {/* Module List */}
                    <div className="space-y-3">
                      {modules.map((module) => (
                        <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <button
                                  type="button"
                                  onClick={() => moveModule(module.id, 'up')}
                                  disabled={module.order === 0}
                                  className="p-1 disabled:opacity-50"
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveModule(module.id, 'down')}
                                  disabled={module.order === modules.length - 1}
                                  className="p-1 disabled:opacity-50"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{module.title}</h4>
                                <p className="text-sm text-gray-500">{module.duration} min • Module {module.order + 1}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => setEditingModule(editingModule === module.id ? null : module.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteModule(module.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {editingModule === module.id && (
                            <div className="mt-4 space-y-3">
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, { title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                              <textarea
                                value={module.description}
                                onChange={(e) => updateModule(module.id, { description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                              />
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingModule(null)}
                                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingModule(null)}
                                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {/* Lessons in this module */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-gray-700">Lessons</h5>
                              <span className="text-xs text-gray-500">
                                {lessons.filter(l => l.moduleId === module.id).length} lessons
                              </span>
                            </div>
                            
                            {/* Add Lesson Form for this module */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Lesson Title *
                                  </label>
                                  <input
                                    type="text"
                                    value={newLesson.title}
                                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    placeholder="Lesson title..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Type
                                  </label>
                                  <select
                                    value={newLesson.type}
                                    onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as any })}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  >
                                    <option value="video">Video</option>
                                    <option value="text">Text</option>
                                    <option value="quiz">Quiz</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Duration (min)
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={newLesson.duration}
                                    onChange={(e) => setNewLesson({ ...newLesson, duration: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Resource URL
                                  </label>
                                  <input
                                    type="text"
                                    value={newLesson.resourceUrl}
                                    onChange={(e) => setNewLesson({ ...newLesson, resourceUrl: e.target.value })}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    placeholder="https://..."
                                  />
                                </div>
                                <div className="flex items-end">
                                  <button
                                    type="button"
                                    onClick={addLesson}
                                    className="w-full px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                  >
                                    Add Lesson
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  value={newLesson.description}
                                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  rows={2}
                                  placeholder="Lesson description..."
                                />
                              </div>
                            </div>
                            
                            {/* Lesson List */}
                            <div className="space-y-2">
                              {lessons
                                .filter(lesson => lesson.moduleId === module.id)
                                .sort((a, b) => a.order - b.order)
                                .map((lesson) => (
                                  <div key={lesson.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <div className="flex items-center space-x-1">
                                        <button
                                          type="button"
                                          onClick={() => moveLesson(lesson.id, 'up')}
                                          disabled={lesson.order === 0}
                                          className="p-1 disabled:opacity-50"
                                        >
                                          <ChevronUp className="w-3 h-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveLesson(lesson.id, 'down')}
                                          disabled={lesson.order === lessons.filter(l => l.moduleId === module.id).length - 1}
                                          className="p-1 disabled:opacity-50"
                                        >
                                          <ChevronDown className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getLessonColor(lesson.type)}`}>
                                        {getLessonIcon(lesson.type)}
                                      </div>
                                      <div>
                                        <h6 className="text-sm font-medium text-gray-900">{lesson.title}</h6>
                                        <p className="text-xs text-gray-500">{lesson.duration} min • {lesson.type}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={() => setEditingLesson(editingLesson === lesson.id ? null : lesson.id)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deleteLesson(lesson.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Course Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{modules.length}</div>
                        <div className="text-xs text-gray-600">Modules</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{lessons.length}</div>
                        <div className="text-xs text-gray-600">Total Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {lessons.filter(l => l.type === 'quiz').length}
                        </div>
                        <div className="text-xs text-gray-600">Quizzes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {modules.reduce((sum, module) => sum + module.duration, 0)}
                        </div>
                        <div className="text-xs text-gray-600">Total Minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'prerequisites' && (
                <>
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add a tag (e.g., python, programming)"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-12 p-2 border border-gray-200 rounded-lg bg-gray-50">
                      {formData.tags.length === 0 ? (
                        <span className="text-sm text-gray-400">No tags added yet</span>
                      ) : (
                        formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-sm shadow-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prerequisites
                    </label>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="text"
                        value={newPrerequisite}
                        onChange={(e) => setNewPrerequisite(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add a prerequisite (e.g., basic-math)"
                      />
                      <button
                        type="button"
                        onClick={addPrerequisite}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-12 p-2 border border-gray-200 rounded-lg bg-gray-50">
                      {formData.prerequisites.length === 0 ? (
                        <span className="text-sm text-gray-400">No prerequisites required</span>
                      ) : (
                        formData.prerequisites.map((prereq, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {prereq}
                            <button
                              type="button"
                              onClick={() => removePrerequisite(prereq)}
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
          
          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-base font-medium text-white hover:opacity-90 focus:outline-none disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {course ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {course ? 'Update Course' : 'Create Course'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default CourseModal;