import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Talk from '@/components/Talk'
// nav1
import Index from '@/components/nav1/Index'
// nav2
import MerchantApplication from '@/components/nav2/MerchantApplication'
import Test from '@/components/nav2/MerchantApplication/test'
import ApplicationDetails from '@/components/nav2/MerchantApplication/ApplicationDetails'
import MerchantReminderApplication from '@/components/nav2/MerchantReminderApplication'
import WithdrawDetails from '@/components/nav2/MerchantReminderApplication/WithdrawDetails'
import MerchantManagement from '@/components/nav2/MerchantManagement'
import MerchantDetails from '@/components/nav2/MerchantManagement/MerchantDetails'
import ShopManagement from '@/components/nav2/ShopManagement'
import MerchandiseEdit from '@/components/nav2/ShopManagement/MerchandiseEdit'
import OrderManagement from '@/components/nav2/OrderManagement'
// nav3
import UserManagement from '@/components/nav3/UserManagement'
import CardManagement from '@/components/nav3/CardManagement'
import CardDetails from '@/components/nav3/CardManagement/CardDetails'
import UserDetails from '@/components/nav3/UserManagement/UserDetails'
import CardIssue from '@/components/nav3/CardIssue'
import ChargeDetails from '@/components/nav3/CardManagement/CardDetails/ChargeDetails'
// nav4
import CardComprehensiveStatistics from '@/components/nav4/CardComprehensiveStatistics'
import UserStatistics from '@/components/nav4/UserStatistics'
// nav5
import AppIndexSet from '@/components/nav5/AppIndexSet'
import SetImgList from '@/components/nav5/AppIndexSet/SetImgList'
import CardTypeInSet from '@/components/nav5/CardTypeInSet'
import CardSet from '@/components/nav5/CardTypeInSet/CardSet'
import CouponManagement from '@/components/nav5/CouponManagement'
import CouponSet from '@/components/nav5/CouponManagement/CouponSet'
import CouponInfo from '@/components/nav5/CouponManagement/CouponInfo'
import StaffManagement from '@/components/nav5/StaffManagement'
import StaffSet from '@/components/nav5/StaffManagement/StaffSet'
// nav7
import BasicSetting from '@/components/nav7/BasicSetting'
// back
import BackPage from '@/components/BackPage'
import LaundryServiceOrder from '@/components/backpage/LaundryServiceOrder'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/hello',
      name: 'hello',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/talk',
      name: 'talk',
      component: Talk,
      meta: {
        requrireAuth: true
      }
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requrireAuth: true // requireAuth自定义
      },
      children: [
        // nav1
        {
          path: 'index',
          name: 'index',
          component: Index,
          meta: {
            requrireAuth: true,
            title: "主页"
          }
        },
        // nav2
        {
          path: 'merchantapplication',
          name: 'merchantapplication',
          component: MerchantApplication,
          meta: {
            requrireAuth: true,
            title: "商户开店申请"
          },
          children: [{
            path: 'applicationdetails',
            name: 'applicationdetails',
            component: ApplicationDetails,
            meta: {
              requrireAuth: true,
              title: "申请详情"
            },
          }]
        },
        {
          path: 'merchantreminderapplication',
          name: 'merchantreminderapplication',
          component: MerchantReminderApplication,
          meta: {
            requrireAuth: true,
            title: "商户提现申请"
          },
          children: [{
            path: 'withdrawdetails',
            name: 'withdrawdetails',
            component: WithdrawDetails,
            meta: {
              requrireAuth: true,
              title: "申请详情"
            },
          }]
        },
        {
          path: 'merchantmanagement',
          name: 'merchantmanagement',
          component: MerchantManagement,
          meta: {
            requrireAuth: true,
            title: "商家管理"
          },
          children: [{
            path: 'merchantdetails',
            name: 'merchantdetails',
            component: MerchantDetails,
            meta: {
              requrireAuth: true,
              title: "商户详情"
            },
          }]
        },
        {
          path: 'shopmanagement',
          name: 'shopmanagement',
          component: ShopManagement,
          meta: {
            requrireAuth: true,
            title: "商品管理"
          },
          children: [{
            path: 'merchandiseedit',
            name: 'merchandiseedit',
            component: MerchandiseEdit,
            meta: {
              requrireAuth: true,
              title: "商品详情"
            }
          }]
        },
        {
          path: 'ordermanagement',
          name: 'ordermanagement',
          component: OrderManagement,
          meta: {
            requrireAuth: true,
            title: "订单管理"
          }
        },
        // nav3
        {
          path: 'usermanagement',
          name: 'usermanagement',
          component: UserManagement,
          meta: {
            requrireAuth: true,
            title: "用户管理"
          },
          children:[
            {
              path: 'userdetails',
              name: 'userdetails',
              component: UserDetails,
              meta: {
                requrireAuth: true,
                title: "用户详情"
              },
            }
          ]
        },
        {
          path: 'cardmanagement',
          name: 'cardmanagement',
          component: CardManagement,
          meta: {
            requrireAuth: true,
            title: "会员卡管理"
          },
          children:[
            {
              path: 'carddetails',
              name: 'carddetails',
              component: CardDetails,
              meta: {
                requrireAuth: true,
                title: "会员卡详情"
              },
              children:[
                {
                  path: 'chargedetails',
                  name: 'chargedetails',
                  component: ChargeDetails,
                  meta: {
                    requrireAuth: true,
                    title: "充值赠送详情"
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'cardissue',
          name: 'cardissue',
          component: CardIssue,
          meta: {
            requrireAuth: true,
            title: "批量发卡"
          }
        },
        // nav4
        {
          path: 'userstatistics',
          name: 'userstatistics',
          component: UserStatistics,
          meta: {
            requrireAuth: true,
            title: "用户统计"
          }
        },
        {
          path: 'cardcomprehensivestatistics',
          name: 'cardcomprehensivestatistics',
          component: CardComprehensiveStatistics,
          meta: {
            requrireAuth: true,
            title: "卡综合统计"
          }
        },
        // nav5
        {
          path: 'appindexset',
          name: 'appindexset',
          component: AppIndexSet,
          meta: {
            requrireAuth: true,
            title: "APP首页管理"
          },
          children: [{
            path: 'setimglist',
            name: 'setimglist',
            component: SetImgList,
            meta: {
              requrireAuth: true,
              title: "轮播图设置"
            },
          }]
        },
        {
          path: 'cardtypeset',
          name: 'cardtypeset',
          component: CardTypeInSet,
          meta: {
            requrireAuth: true,
            title: "卡类型管理"
          },
          children: [{
            path: 'cardset',
            name: 'cardset',
            component: CardSet,
            meta: {
              requrireAuth: true,
              title: "卡类型设置"
            }
          }]
        },
        {
          path: 'staffmanagement',
          name: 'staffmanagement',
          component: StaffManagement,
          meta: {
            requrireAuth: true,
            title: "员工管理"
          },
          children: [{
            path: 'staffset',
            name: 'staffset',
            component: StaffSet,
            meta: {
              requrireAuth: true,
              title: "员工设置"
            },
          }]
        },
        {
          path: 'couponmanagement',
          name: 'couponmanagement',
          component: CouponManagement,
          meta: {
            requrireAuth: true,
            title: "优惠券管理"
          },
          children: [{
              path: 'couponset',
              name: 'couponset',
              component: CouponSet,
              meta: {
                requrireAuth: true,
                title: "优惠券设置"
              },
            },
            {
              path: 'couponinfo',
              name: 'couponinfo',
              component: CouponInfo,
              meta: {
                requrireAuth: true,
                title: "优惠券详情"
              },
            }
          ]
        },
        // nav7
        {
          path: 'basicsetting',
          name: 'basicsetting',
          component: BasicSetting,
          meta: {
            requrireAuth: true,
            title: "基本信息设置"
          }
        },
        // back
        {
          path: 'backpage',
          name: 'backpage',
          component: BackPage,
          meta: {
            requrireAuth: true,
            title: "返回上一页"
          },
          children:[
            {
              path: 'laundryserviceorder',
              name: 'laundryserviceorder',
              component: LaundryServiceOrder,
              meta: {
                requrireAuth: true,
                title: "洗护服务订单详情"
              },
            }
          ]
        }
      ]
    },
  ]
})
