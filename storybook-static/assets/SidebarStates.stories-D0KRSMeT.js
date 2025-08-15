import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as s,a as l,b,c,d as o,e as n,f as a,g as u}from"./SidebarMenu-BYM2Kj1l.js";import"./index-GiUgBvb1.js";import"./createLucideIcon-DWLQh5sP.js";import"./index-CROobee-.js";const M={title:"Navigation/Sidebar/States",parameters:{layout:"fullscreen"}},r={render:()=>e.jsx("div",{className:"h-screen flex",children:e.jsxs(s,{defaultOpen:!0,children:[e.jsxs(l,{"aria-label":"Primary",className:"shrink-0",children:[e.jsx(b,{children:"States"}),e.jsx(c,{children:e.jsxs(o,{children:[e.jsx(n,{children:e.jsx(a,{icon:e.jsx("span",{children:"🏠"}),label:"Home",active:!0,children:"Active item"})}),e.jsx(n,{children:e.jsx(a,{icon:e.jsx("span",{children:"🔎"}),endAdornment:e.jsx(u,{children:"3"}),label:"Search",children:"Default item with badge"})}),e.jsx(n,{children:e.jsx(a,{icon:e.jsx("span",{children:"⚙️"}),label:"Settings",disabled:!0,children:"Disabled item"})}),e.jsx(n,{children:e.jsx(a,{icon:e.jsx("span",{children:"📄"}),label:"Very Long Label Example",href:"#",children:"Very long label that should truncate gracefully"})})]})})]}),e.jsx("div",{className:"flex-1 p-6",children:"Content Area"})]})})};var i,t,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div className="h-screen flex">
      <SidebarProvider defaultOpen>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>States</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🏠</span>} label="Home" active>
                  Active item
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🔎</span>} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>} label="Search">
                  Default item with badge
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>⚙️</span>} label="Settings" disabled>
                  Disabled item
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>📄</span>} label="Very Long Label Example" href="#">
                  Very long label that should truncate gracefully
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">Content Area</div>
      </SidebarProvider>
    </div>
}`,...(d=(t=r.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const j=["AllStates"];export{r as AllStates,j as __namedExportsOrder,M as default};
