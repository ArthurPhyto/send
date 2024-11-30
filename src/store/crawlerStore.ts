import { create } from 'zustand';
import { CrawlJob } from '../types/crawler';

interface CrawlerStore {
  jobs: CrawlJob[];
  activeJobs: string[];
  addJob: (job: CrawlJob) => void;
  updateJob: (id: string, updates: Partial<CrawlJob>) => void;
  stopJob: (id: string) => void;
}

export const useCrawlerStore = create<CrawlerStore>((set) => ({
  jobs: [],
  activeJobs: [],
  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, job],
      activeJobs: [...state.activeJobs, job.id],
    })),
  updateJob: (id, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...updates } : job
      ),
    })),
  stopJob: (id) =>
    set((state) => ({
      activeJobs: state.activeJobs.filter((jobId) => jobId !== id),
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, status: 'stopped' } : job
      ),
    })),
}));