import { motion } from 'motion/react';
import { X, Calendar, User, Clock, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <div id="project-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        id="project-modal-container"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-white border-4 border-on-background neubrutal-shadow-xl overflow-hidden max-h-[90vh] flex flex-col z-10"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 bg-primary-container border-b-4 border-on-background">
          <h3 className="font-display text-2xl font-black text-on-background uppercase tracking-tight">
            {project.title}
          </h3>
          <button 
            id="close-modal-btn"
            onClick={onClose} 
            className="p-2 bg-white border-2 border-on-background neubrutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <X className="w-6 h-6 text-on-background" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Banner Image */}
          <div className="relative w-full overflow-hidden border-4 border-on-background bg-surface-container aspect-video">
            <img 
              referrerPolicy="no-referrer"
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-secondary text-on-secondary border-2 border-on-background px-3 py-1 font-label text-sm uppercase">
              {project.category}
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left side: Description & Highlights */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h4 className="font-display text-xl font-extrabold text-on-background uppercase mb-2">My Role &amp; Story</h4>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {project.detailedContent || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="font-display text-xl font-extrabold text-on-background uppercase mb-3">Key Solutions Implemented</h4>
                  <ul className="space-y-3 font-body">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 bg-surface-container-low p-3 border-2 border-on-background neubrutal-shadow hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-on-background">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right side: Meta Specs */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-secondary-container/20 p-6 border-4 border-on-background neubrutal-shadow space-y-4">
                <h4 className="font-display text-md font-black text-on-background uppercase tracking-tight pb-2 border-b-2 border-on-background">
                  Spesifikasi Proyek
                </h4>
                
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <span className="block text-xs font-label text-on-surface-variant uppercase">Klien</span>
                    <span className="font-body font-bold text-sm text-on-background">{project.client || 'Kreatif Hub Partner'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <span className="block text-xs font-label text-on-surface-variant uppercase">Tahun</span>
                    <span className="font-body font-bold text-sm text-on-background">{project.year || '2024'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <span className="block text-xs font-label text-on-surface-variant uppercase">Durasi Kerja</span>
                    <span className="font-body font-bold text-sm text-on-background">{project.duration || '2 Bulan'}</span>
                  </div>
                </div>
              </div>

              {project.techStack && (
                <div className="space-y-3">
                  <h4 className="font-display text-md font-black text-on-background uppercase tracking-tight">
                    Tech Stack &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed border-2 border-on-background font-label text-xs font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-surface-container-high border-t-4 border-on-background flex flex-col sm:flex-row justify-end gap-4">
          <button 
            id="modal-close-action-btn"
            onClick={onClose} 
            className="sm:px-6 py-3 px-4 bg-white border-2 border-on-background font-label text-sm uppercase font-bold neubrutal-shadow neubrutal-btn-active text-center cursor-pointer"
          >
            Tutup Detail Proyek
          </button>
          
          <a
            id="modal-live-action-btn"
            href="#contact"
            onClick={(e) => {
              onClose();
              setTimeout(() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="sm:px-6 py-3 px-4 bg-secondary text-on-secondary border-2 border-on-background font-label text-sm uppercase font-bold neubrutal-shadow neubrutal-btn-active text-center"
          >
            Tanyakan Proyek Serupa
          </a>
        </div>
      </motion.div>
    </div>
  );
}
