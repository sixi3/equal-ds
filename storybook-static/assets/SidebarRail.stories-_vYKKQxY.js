import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as l,a as t,b as o,c,d as b,e as r,f as n,g as S}from"./SidebarMenu-BYM2Kj1l.js";import{S as m}from"./SidebarTrigger-BD0kuToE.js";import"./index-GiUgBvb1.js";import"./createLucideIcon-DWLQh5sP.js";import"./index-CROobee-.js";const M={title:"Navigation/Sidebar/Rail",parameters:{layout:"fullscreen"}},a={render:()=>e.jsx("div",{className:"h-screen flex",children:e.jsxs(l,{defaultOpen:!1,children:[e.jsxs(t,{"aria-label":"Primary",className:"shrink-0",children:[e.jsx(o,{children:"•"}),e.jsx(c,{children:e.jsxs(b,{children:[e.jsx(r,{children:e.jsx(n,{icon:e.jsx("span",{children:"🏠"}),label:"Home"})}),e.jsx(r,{children:e.jsx(n,{icon:e.jsx("span",{children:"🔎"}),endAdornment:e.jsx(S,{children:"3"}),label:"Search"})}),e.jsx(r,{children:e.jsx(n,{icon:e.jsx("span",{children:"⚙️"}),label:"Settings"})})]})})]}),e.jsxs("div",{className:"flex-1 p-6 space-y-4",children:[e.jsx(m,{children:"Toggle"}),e.jsx("div",{children:"Content Area"})]})]})})};var i,d,s;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div className="h-screen flex">
      <SidebarProvider defaultOpen={false}>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>•</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🏠</span>} label="Home" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🔎</span>} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>} label="Search" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>⚙️</span>} label="Settings" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6 space-y-4">
          <SidebarTrigger>Toggle</SidebarTrigger>
          <div>Content Area</div>
        </div>
      </SidebarProvider>
    </div>
}`,...(s=(d=a.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};const f=["Collapsed"];export{a as Collapsed,f as __namedExportsOrder,M as default};
