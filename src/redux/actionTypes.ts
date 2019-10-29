export const CHANGE_STORY_IN_VIEW_SUCCESS = 'CHANGE_STORY_IN_VIEW_SUCCESS';
export const CHANGE_STORY_IN_VIEW_REQUESTED = 'CHANGE_STORY_IN_VIEW_REQUESTED';
export const CHANGE_STORY_IN_VIEW_FAILED = 'CHANGE_STORY_IN_VIEW_FAILED';

export interface StoryInView {
  id: number | null;
  title: string;
  storyUrl: string;
  content: string;
  isLoading: boolean;
}

export interface StoryInViewState extends StoryInView {} // eslint-disable-line @typescript-eslint/no-empty-interface

interface ChangeStoryInViewAction {
  type:
    | typeof CHANGE_STORY_IN_VIEW_SUCCESS
    | typeof CHANGE_STORY_IN_VIEW_REQUESTED;
  payload: StoryInView;
}

export type StoryInViewActionTypes = ChangeStoryInViewAction;
