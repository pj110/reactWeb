
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
//引入路由树
import { routeNav, routers } from '@/routers'
function App() {
  // 使用路由表
  const element = useRoutes(routers)
  console.log('element', routers)
  return (
    <div>
      {element}
    </div>
  );
}

export default App;
