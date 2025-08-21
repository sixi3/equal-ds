import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as l,a as c,b as p,c as m,d as n,e as a,f as i}from"./SidebarMenu-BYM2Kj1l.js";import{S as d,a as t,b as s,c as o}from"./SidebarGroup-CW2K4V6N.js";import"./index-GiUgBvb1.js";import"./createLucideIcon-DWLQh5sP.js";import"./index-CROobee-.js";import"./index-DMPZTNEN.js";const f={title:"Navigation/Sidebar/Groups",parameters:{layout:"fullscreen"}},r={render:()=>e.jsx("div",{className:"h-screen flex",children:e.jsxs(l,{defaultOpen:!0,children:[e.jsxs(c,{"aria-label":"Primary",className:"shrink-0",children:[e.jsx(p,{children:"Groups"}),e.jsxs(m,{children:[e.jsxs(d,{defaultOpen:!0,children:[e.jsx(t,{children:e.jsx(s,{children:"Section A"})}),e.jsx(o,{children:e.jsx(n,{children:e.jsx(a,{children:e.jsx(i,{children:"Item A1"})})})})]}),e.jsxs(d,{children:[e.jsx(t,{children:e.jsx(s,{children:"Section B"})}),e.jsx(o,{children:e.jsxs(n,{children:[e.jsx(a,{children:e.jsx(i,{children:"Item B1"})}),e.jsxs(d,{children:[e.jsx(t,{children:e.jsx(s,{children:"Subsection B.1"})}),e.jsx(o,{children:e.jsx(n,{children:e.jsx(a,{children:e.jsx(i,{children:"Item B1.a"})})})})]})]})})]})]})]}),e.jsx("div",{className:"flex-1 p-6",children:"Content Area"})]})})};var b,u,S;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="h-screen flex">
      <SidebarProvider defaultOpen>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>Groups</SidebarHeader>
          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Section A</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item A1</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Section B</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item B1</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarGroup>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>Subsection B.1</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Item B1.a</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">Content Area</div>
      </SidebarProvider>
    </div>
}`,...(S=(u=r.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const I=["Nested"];export{r as Nested,I as __namedExportsOrder,f as default};
