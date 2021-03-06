import React, { useEffect, useState, useContext } from 'react';
import firebase from '../../firebase/firebase';
import {
  addReadingList,
  subscReadingList,
  searchReadingList,
} from '../../domain/readingList';
import type { ReadingList } from '../../domain/readingList';
import { getPreview } from '../../api/preview';
import SettingContext from '../../context/settingContext';

const useList = () => {
  const [readingLists, setReadingLists] = useState<ReadingList[] | null>(null);
  const [searchResult, setSearchResult] = useState<ReadingList[]>([]);
  const [InputUrl, setInputUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>('');

  const userSetting = useContext(SettingContext);

  useEffect(() => {
    subscReadingList(setReadingLists);
  }, []);

  const logout = () => {
    firebase.auth().signOut();
  };

  const onInputSearchKeyword = async (keyword: string) => {
    setInputSearch(keyword);
    const isShowRead =
      userSetting?.showRead === undefined ? false : userSetting.showRead;
    const result = await searchReadingList(keyword, isShowRead);
    setSearchResult(result);
  };

  const modalOpen = () => {
    if (isModalOpen === false) {
      setIsModalOpen(true);
      return;
    }
    setIsModalOpen(false);
  };

  const addList = async () => {
    if (InputUrl === '') {
      /* eslint-disable no-undef */
      // @ts-ignore
      chrome.tabs.getSelected(async (tab: { url: string }) => {
        const { url } = tab;
        const overview = await getPreview(url);
        await addReadingList(overview);
      });
      return;
      /* eslint-enable no-undef */
    }
    const overview = await getPreview(InputUrl);
    await addReadingList(overview);
  };

  const onInputURL = (val: string) => {
    setInputUrl(val);
  };

  const onEnterInput = async (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      setInputUrl('');
      await addList();
    }
  };

  const columnCount = (lists: ReadingList[] | null) => {
    if (lists === null) {
      return {};
    }
    if (window.innerWidth > 960) {
      if (lists.length === 1) {
        return { columnCount: 1 };
      }
      if (lists.length === 2) {
        return { columnCount: 2 };
      }
      if (lists.length === 3) {
        return { columnCount: 3 };
      }
      if (lists.length === 4) {
        return { columnCount: 2 };
      }
    }
    return {};
  };

  return {
    state: { readingLists, InputUrl, isModalOpen, searchResult, inputSearch },
    func: {
      logout,
      addList,
      onInputURL,
      modalOpen,
      onInputSearchKeyword,
      onEnterInput,
      columnCount,
    },
  };
};

export default useList;
