import ProjectSectionClient from './ProjectSectionClient';
import { htechService } from '@/common/services/htech.service';

export default async function ProjectSection() {
  let projectList: any[] = [];
  try {
    const response: any = await htechService.getOutstandingProjects();
    if (response?.data?.data) {
       projectList = response.data.data;
    } else if (Array.isArray(response?.data)) {
       projectList = response.data;
    }

    // Format the thumbnail URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const host = apiUrl.replace(/\/api\/v1\/?$/, ''); // Remove /api/v1 from host

    projectList = projectList.map((item: any) => {
      let url = item.thumbnail_url;
      if (url && !url.startsWith('http')) {
        url = `${host}${url.startsWith('/') ? url : `/${url}`}`;
      }
      return { ...item, thumbnail_url: url || '/assets/services/s2.jpg' };
    });
  } catch (error) {
    console.error("Error fetching outstanding projects:", error);
  }

  return <ProjectSectionClient projects={projectList} />;
}