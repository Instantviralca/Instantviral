/**
 * Content Library types — Phase 17.
 */

export type ContentLibrarySlotStatus =
  | 'Not Started'
  | 'In Progress'
  | 'In QA'
  | 'Ready to Publish'
  | 'Published';

export type ContentLibrarySlot = {
  slot: number;
  articleId: string;
  title: string;
  slug: string;
  platform: string;
  platformFolder: string;
  packagePath: string;
  status: ContentLibrarySlotStatus;
  successCriteria: string[];
};

export type ContentLibraryQueue = {
  phase: '17';
  title: string;
  totalPlanned: number;
  starterCount: number;
  slots: ContentLibrarySlot[];
};
