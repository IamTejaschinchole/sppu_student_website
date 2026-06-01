import {
  getSppuSemesterBySlug,
  getSppuSemestersForBranchSlug,
  getSppuSubjectBranchBySlug,
  sppuBranchMeta,
  sppuSubjectBranchOrder,
} from '../data/sppuSubjects.js';

export const sppuBranches = sppuSubjectBranchOrder.map((branchKey) => ({
  ...sppuBranchMeta[branchKey],
}));

export const mostActiveSppuBranches = sppuBranches.slice(0, 3);

export const sppuSemesters = getSppuSemestersForBranchSlug('information-technology');

export function getSppuBranch(branchSlug) {
  return getSppuSubjectBranchBySlug(branchSlug);
}

export function getSppuSemester(semesterSlug) {
  return getSppuSemesterBySlug(semesterSlug);
}

export function getSppuSemesters(branchSlug) {
  return getSppuSemestersForBranchSlug(branchSlug);
}
