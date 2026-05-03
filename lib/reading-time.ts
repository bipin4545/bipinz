import type { Post } from './types';
import type { Project } from './types';

/**
 * Calculate reading time from markdown/plain content.
 * Average reading speed: 225 words per minute.
 * Returns both minutes and word count for Article schema.
 */
export function calculateReadingTime(content: string): {
  minutes: number;
  words: number;
  text: string;
} {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/[#*_>`\-]/g, ' ') // remove markdown markers
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));

  return {
    minutes,
    words,
    text: `${minutes} min read`,
  };
}

/**
 * Convert minutes to ISO 8601 duration (Article.timeRequired)
 * e.g., 7 min → PT7M
 */
export function toIsoDuration(minutes: number): string {
  return `PT${minutes}M`;
}

/**
 * Find related posts by shared category, excluding current slug.
 * Falls back to most recent if no category match.
 */
export function getRelatedPosts(current: Post, allPosts: Post[], limit = 3): Post[] {
  const related = allPosts
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .slice(0, limit);

  if (related.length < limit) {
    const fallback = allPosts
      .filter((p) => p.slug !== current.slug && !related.includes(p))
      .slice(0, limit - related.length);
    return [...related, ...fallback];
  }
  return related;
}

/**
 * Find related projects by shared tech stack, excluding current slug.
 */
export function getRelatedProjects(
  current: Project,
  allProjects: Project[],
  limit = 2
): Project[] {
  const scored = allProjects
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      project: p,
      score: p.techStack.filter((t) => current.techStack.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project);

  return scored;
}
