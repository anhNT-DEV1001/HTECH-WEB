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
   * Fetch all public news with pagination and filters
   * GET /news/htech/all
   */
  getAllNews: async (params?: { page?: number; limit?: number; category_id?: number; search?: string; searchBy?: string }) => {
    return axiosInstance.get('/news/htech/all', { params });
  },

  /**
   * Fetch all public news categories
   * GET /news/htech/category
   */
  getAllCategories: async () => {
    return axiosInstance.get('/news/htech/category');
  },
  /**
   * Fetch a specific news article by ID
   * GET /news/:id
   */
  getNewsById: async (id: string | number) => {
    return axiosInstance.get(`/news/${id}`);
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
