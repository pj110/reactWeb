import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'
//import { store } from '@/redux/store'
//引入鉴权组件
import Authentication from './Authentication'
//路由懒加载
const Home = lazy(() => import('../pages/Home'));
const User = lazy(() => import('../pages/Home/User'));
const Device = lazy(() => import('../pages/Home/Device'));
const VideoAccess = lazy(() => import('../pages/Home/VideoAccess'));
const Activation = lazy(() => import('../pages/Home/Activation'))
const Login = lazy(() => import('../containers/Login'))
//获取是否登陆
//const { isLogin } = store.getState();


const loadingElement = (Element) => {
    return (
        <Suspense fallback={<Loading></Loading>}>
            {Element}
        </Suspense>
    )
}
/**
 * @path 路由地址(必填)
 * 
 * @auth 是否需要鉴权(必填)
 * 
 * @element 组件(必填)
*/
export const routers = [
    {
        path: '/login',
        auth: false,
        breadName: '登陆',
        element: (
            loadingElement(<Login />)
        )
    },
    {
        path: '/home',
        auth: true,
        element: loadingElement(<Home />),
        breadName: '首页',
        children: [
            {
                path: '/home/videoAccess',
                breadName: '视频广场',
                auth: true,
                element: (
                    <Authentication>
                        {
                            loadingElement(<VideoAccess />)
                        }
                    </Authentication>
                ),
            },
            {
                path: '/home/user',
                breadName: '用户管理',
                auth: true,
                element: (
                    <Authentication>
                        {
                            loadingElement(<User />)
                        }
                    </Authentication>
                ),
            },
            {
                path: '/home/device',
                breadName: '设备列表',
                auth: true,
                element: (
                    <Authentication>
                        {
                            loadingElement(<Device />)
                        }
                    </Authentication>
                ),
            },
            {
                path: '/home/activation',
                breadName: '激活设备',
                auth: true,
                element: (
                    <Authentication>
                        {
                            loadingElement(<Activation />)
                        }
                    </Authentication>
                ),
            },
            {
                path: '',
                auth: false,
                element: (
                    <Navigate to='videoAccess'></Navigate>
                ),
            }
        ]
    },
    {
        path: '*',
        auth: false,
        element: <Navigate to='/home'></Navigate>
    }
]
//处理routers的方法
/**

 * @param 路由列表
 *
*/
// export const routeNav = (param) => {
//     let newList = param.map(item => {
//         if (item.children) {
//             item.children = routeNav(item.children)
//         }
//         if (item.auth) {
//             console.log('123123', item.element.props.to, item.element)
//             item.element = (<Authentication to={item.path}>{item.element}</Authentication>)
//         }
//         return item
//     })
//     return newList
// }
export const flattenRoutes = arr =>
    arr.reduce(function (prev, item) {
        prev.push(item);
        return prev.concat(
            Array.isArray(item.children) ? flattenRoutes(item.children) : []
        );
    }, []);
export const getBreadcrumbs = (flattenRoutes, location) => {
    // 初始化匹配数组match
    let matches = [];
    location.pathname
        // 取得路径名，然后将路径分割成每一路由部分.
        .split('?')[0]
        .split('/')
        // 对每一部分执行一次调用`getBreadcrumb()`的reduce.
        .reduce((prev, curSection) => {
            // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
            const pathSection = `${prev}/${curSection}`;
            // 对于 拆分的路径，从 flattenRoutes 中查找对应的路由
            const breadcrumb = getBreadcrumb({ flattenRoutes, curSection, pathSection });

            // 将面包屑导入到matches数组中
            matches.push(breadcrumb);

            // 传递给下一次reduce的路径部分
            return pathSection;
        });
    return matches;
};
const getBreadcrumb = ({ flattenRoutes, curSection, pathSection }) => {
    const matchRoute = flattenRoutes.find(ele => {
        const { breadName, path } = ele;
        // if (!breadcrumb || !path) {
        //     throw new Error('Router中的每一个route必须包含 `path` 以及 `breadcrumb` 属性');
        // }
        /**
         * matchPath方法由 react-router-dom提供，实际上也可以使用如下方式替代
         * return pathSection === path
         */
        return pathSection === path;
    });
    if (!matchRoute) {
        return curSection
    }
    return matchRoute.breadName
}