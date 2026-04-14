import { readdir } from 'node:fs/promises';
import path from 'node:path';
import ProjectSectionClient from './ProjectSectionClient';
import { htechService } from '@/common/services/htech.service';
import { extractListFromApiResponse, resolveApiAssetUrl } from '@/common/utils/api';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif']);

type ProjectSectionProject = {
  id?: number | string;
  thumbnail_url?: string | null;
  [key: string]: unknown;
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
    const response = await htechService.getOutstandingProjects();

    projectList = extractListFromApiResponse<ProjectSectionProject>(response).map((item) => ({
      ...item,
      thumbnail_url: resolveApiAssetUrl(item.thumbnail_url, '/assets/services/s2.jpg'),
    }));
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
