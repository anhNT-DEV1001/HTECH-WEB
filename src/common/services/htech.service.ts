import axiosInstance from '@/lib/axios';

export const htechService = {
  /**
   * Fetch outstanding news
   * GET /news/htech/outstanding
   */
  getOutstandingNews: async () => {
    return axiosInstance.get('/news/htech/outstanding');
  },

  /**
   * Fetch outstanding projects
   * GET /projects/htech/outstanding
   */
  getOutstandingProjects: async () => {
    return axiosInstance.get('/project/htech/outstanding');
  },
};
