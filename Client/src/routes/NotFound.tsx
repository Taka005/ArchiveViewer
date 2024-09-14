const NotFound = ()=>{
  return (
    <div class="bg-gray-100">
      <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-8xl font-bold text-gray-800">404</h1>
        <p class="text-4xl font-medium text-gray-800">ページが見つかりません</p>
        <a href="/" class="mt-4 text-xl text-blue-600 hover:underline">アーカイブ一覧に戻る</a>
      </div>
    </div>
  )
}

export default NotFound;