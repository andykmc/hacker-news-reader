export const CHANGE_STORY_IN_VIEW = 'CHANGE_STORY_IN_VIEW';

export interface StoryInView {
  id: number | null;
  storyUrl: string;
}

export interface StoryInViewState extends StoryInView {} // eslint-disable-line @typescript-eslint/no-empty-interface

interface ChangeStoryInViewAction {
  type: typeof CHANGE_STORY_IN_VIEW;
  payload: StoryInView;
}

export type StoryInViewActionTypes = ChangeStoryInViewAction;
