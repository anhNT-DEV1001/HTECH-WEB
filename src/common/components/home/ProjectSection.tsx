import { readdir } from 'node:fs/promises';
import path from 'node:path';
import ProjectSectionClient from './ProjectSectionClient';
import { htechService } from '@/common/services/htech.service';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif']);

type ProjectSectionProject = {
  id?: number | string;
  thumbnail_url?: string | null;
  [key: string]: unknown;
};

type OutstandingProjectsResponse = {
  data?: {
    data?: ProjectSectionProject[];
  } | ProjectSectionProject[];
};

async function getPartnerLogos(folder: 'in' | 'out') {
  const directory = path.join(process.cwd(), 'public', 'assets', 'parttern-logo', folder);

  try {
    const entries = await readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => encodeURI(`/assets/parttern-logo/${folder}/${entry.name}`))
      .sort((left, right) => left.localeCompare(right, 'vi', { numeric: true, sensitivity: 'base' }));
  } catch (error) {
    console.error(`Error reading partner logos from ${folder}:`, error);
    return [];
  }
}

export default async function ProjectSection({ lng }: { lng: string }) {
  let projectList: ProjectSectionProject[] = [];
  const [domesticPartnerLogos, internationalPartnerLogos] = await Promise.all([
    getPartnerLogos('in'),
    getPartnerLogos('out'),
  ]);

  try {
    const response = await htechService.getOutstandingProjects() as OutstandingProjectsResponse;

    if (response?.data && !Array.isArray(response.data) && Array.isArray(response.data.data)) {
       projectList = response.data.data;
    } else if (Array.isArray(response?.data)) {
       projectList = response.data;
    }

    // Format the thumbnail URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const host = apiUrl.replace(/\/api\/v1\/?$/, ''); // Remove /api/v1 from host

    projectList = projectList.map((item) => {
      let url = typeof item.thumbnail_url === 'string' ? item.thumbnail_url : '';
      if (url && !url.startsWith('http')) {
        url = `${host}${url.startsWith('/') ? url : `/${url}`}`;
      }
      return { ...item, thumbnail_url: url || '/assets/services/s2.jpg' };
    });
  } catch (error) {
    console.error("Error fetching outstanding projects:", error);
  }

  return (
    <ProjectSectionClient
      lng={lng}
      projects={projectList}
      domesticPartnerLogos={domesticPartnerLogos}
      internationalPartnerLogos={internationalPartnerLogos}
    />
  );
}
