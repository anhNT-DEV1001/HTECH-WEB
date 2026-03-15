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
   * GET /project/htech/outstanding
   */
  getOutstandingProjects: async () => {
    return axiosInstance.get('/project/htech/outstanding');
  },

  /**
   * Fetch all public projects with optional filters
   * GET /project/htech/all
   */
  getAllProjects: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: number;
  }) => {
    return axiosInstance.get('/project/htech/all', { params });
  },

  /**
   * Fetch all project categories (public)
   * GET /project/htech/categories
   */
  getProjectCategories: async () => {
    return axiosInstance.get('/project/htech/categories');
  },
};
