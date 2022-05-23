const useKeyboard = () => {
  const onPressEnter = (arg: Function, event: any) => {
    if (event.key === 'Enter') {
      // エンターキー押下時の処理
      arg()
    }
  }

  return { onPressEnter }
}

export default useKeyboard
