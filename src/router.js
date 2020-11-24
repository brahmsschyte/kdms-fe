import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import Home from './components/Home.vue';
import Document from './components/documents/index.vue';
import DocumentNew from './components/documents/new.vue';
import DocumentShow from './components/documents/show.vue';
import DocumentEdit from './components/documents/edit.vue';
import Metadata from './components/metadata/index.vue';
import MetadataNew from './components/metadata/new.vue';
import MetadataShow from './components/metadata/show.vue';
import MetadataEdit from './components/metadata/edit.vue';
import Role from './components/roles/index.vue';
import RoleNew from './components/roles/new.vue';
import RoleShow from './components/roles/show.vue';
import RoleEdit from './components/roles/edit.vue';
import Template from './components/templates/index.vue';
import TemplateNew from './components/templates/new.vue';
import TemplateShow from './components/templates/show.vue';
import TemplateEdit from './components/templates/edit.vue';
import User from './components/users/index.vue';
import UserNew from './components/users/new.vue';
import UserShow from './components/users/show.vue';
import UserEdit from './components/users/edit.vue';
import Workflow from './components/workflows/index.vue';
import WorkflowNew from './components/workflows/new.vue';
import WorkflowShow from './components/workflows/show.vue';
import WorkflowEdit from './components/workflows/edit.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/document',
      name: 'document',
      component: Document,
    },
    {
      path: '/document/new',
      name: 'new_document',
      component: DocumentNew,
    },
    {
      path: '/document/:id',
      name: 'show_document',
      component: DocumentShow,
    },
    {
      path: '/document/:id/edit',
      name: 'edit_document',
      component: DocumentEdit,
    },
    {
      path: '/metadata',
      name: 'metadata',
      component: Metadata,
    },
    {
      path: '/metadata/new',
      name: 'new_metadata',
      component: MetadataNew,
    },
    {
      path: '/metadata/:id',
      name: 'show_metadata',
      component: MetadataShow,
    },
    {
      path: '/metadata/:id/edit',
      name: 'edit_metadata',
      component: MetadataEdit,
    },
    {
      path: '/role',
      name: 'role',
      component: Role,
    },
    {
      path: '/role/new',
      name: 'new_role',
      component: RoleNew,
    },
    {
      path: '/role/:id',
      name: 'show_role',
      component: RoleShow,
    },
    {
      path: '/role/:id/edit',
      name: 'edit_role',
      component: RoleEdit,
    },
    {
      path: '/template',
      name: 'template',
      component: Template,
    },
    {
      path: '/template/new',
      name: 'new_template',
      component: TemplateNew,
    },
    {
      path: '/template/:id',
      name: 'show_template',
      component: TemplateShow,
    },
    {
      path: '/template/:id/edit',
      name: 'edit_template',
      component: TemplateEdit,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/user/new',
      name: 'new_user',
      component: UserNew,
    },
    {
      path: '/user/:id',
      name: 'show_user',
      component: UserShow,
    },
    {
      path: '/user/:id/edit',
      name: 'edit_user',
      component: UserEdit,
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: Workflow,
    },
    {
      path: '/workflow/new',
      name: 'new_workflow',
      component: WorkflowNew,
    },
    {
      path: '/workflow/:id',
      name: 'show_workflow',
      component: WorkflowShow,
    },
    {
      path: '/workflow/:id/edit',
      name: 'edit_workflow',
      component: WorkflowEdit,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log('Router Guard Invoked!');
  if (to.fullPath === '/login') {
    next();
  } else if (localStorage.getItem('USER_TOKEN') === null) {
    next('/login');
  } else {
    store.dispatch('user/validate').then(() => {
      next();
    }).catch(() => {
      next('/login');
    });
  }
});

export default router;
