import{j as e}from"./jsx-runtime-CDt2p4po.js";import{R as b}from"./index-GiUgBvb1.js";import{C as c,G as j,a as f,b as S}from"./grid-2x2-plus-CJ9rO1Pi.js";import{S as g,a as w,b as C,c as N,d as a,e as d,f as i}from"./SidebarMenu-BATPYC4A.js";import{S as p}from"./SidebarTrigger-14nJB9uL.js";import{S as s,a as o,b as n,c as t}from"./SidebarGroup-ChV-Hq4f.js";import"./createLucideIcon-CdaCr0Fg.js";import"./index-CROobee-.js";const R={title:"Navigation/Sidebar/Reorderable",parameters:{layout:"fullscreen"}},u={render:()=>{const[r,x]=b.useState(()=>{const l=typeof window<"u"?window.localStorage.getItem("sidebarGroupOrder"):null;return l?JSON.parse(l):["a","b","c","d"]});return b.useEffect(()=>{typeof window<"u"&&window.localStorage.setItem("sidebarGroupOrder",JSON.stringify(r))},[r]),e.jsx("div",{className:"h-screen flex",children:e.jsxs(g,{defaultOpen:!0,children:[e.jsxs(w,{"aria-label":"Primary",className:"shrink-0",children:[e.jsxs(C,{className:"flex items-center justify-between h-16",children:[e.jsx("div",{className:"font-semibold",children:"Reorder Demo"}),e.jsx(p,{srLabel:"Collapse sidebar",className:"h-8 w-8",children:e.jsx(c,{className:"h-5 w-5"})})]}),e.jsxs(N,{reorderGroups:!0,groupOrder:r,onGroupOrderChange:x,children:[e.jsxs(s,{id:"a",defaultOpen:!0,children:[e.jsx(o,{children:e.jsx(n,{children:"Group A"})}),e.jsx(t,{children:e.jsx(a,{children:e.jsx(d,{children:e.jsx(i,{icon:e.jsx(j,{className:"w-5 h-5"}),children:"Item A"})})})})]}),e.jsxs(s,{id:"b",defaultOpen:!0,children:[e.jsx(o,{children:e.jsx(n,{children:"Group B"})}),e.jsx(t,{children:e.jsx(a,{children:e.jsx(d,{children:e.jsx(i,{icon:e.jsx(f,{className:"w-5 h-5"}),children:"Item B"})})})})]}),e.jsxs(s,{id:"c",defaultOpen:!0,children:[e.jsx(o,{children:e.jsx(n,{children:"Group C"})}),e.jsx(t,{children:e.jsx(a,{children:e.jsx(d,{children:e.jsx(i,{icon:e.jsx(S,{className:"w-5 h-5"}),children:"Item C"})})})})]}),e.jsxs(s,{id:"d",defaultOpen:!0,children:[e.jsx(o,{children:e.jsx(n,{children:"Group D"})}),e.jsx(t,{children:e.jsx(a,{children:e.jsx(d,{children:e.jsx(i,{icon:e.jsx(S,{className:"w-5 h-5"}),children:"Item D"})})})})]})]})]}),e.jsxs("div",{className:"flex-1 p-6 space-y-4",children:[e.jsx(p,{children:e.jsx(c,{className:"h-5 w-5"})}),e.jsxs("div",{children:["Order: ",r.join(", ")]})]})]})})}};var m,h,G;u.parameters={...u.parameters,docs:{...(m=u.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [order, setOrder] = React.useState<string[]>(() => {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('sidebarGroupOrder') : null;
      return saved ? JSON.parse(saved) : ['a', 'b', 'c', 'd'];
    });
    React.useEffect(() => {
      if (typeof window !== 'undefined') window.localStorage.setItem('sidebarGroupOrder', JSON.stringify(order));
    }, [order]);
    return <div className="h-screen flex">
        <SidebarProvider defaultOpen>
          <Sidebar aria-label="Primary" className="shrink-0">
            <SidebarHeader className="flex items-center justify-between h-16">
              <div className="font-semibold">Reorder Demo</div>
              <SidebarTrigger srLabel="Collapse sidebar" className="h-8 w-8">
                <ArrowLeftCircle className="h-5 w-5" />
              </SidebarTrigger>
            </SidebarHeader>
            <SidebarContent reorderGroups groupOrder={order} onGroupOrderChange={setOrder}>
              <SidebarGroup id="a" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group A</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Grid2x2Plus className="w-5 h-5" />}>Item A</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="b" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group B</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<ChartPie className="w-5 h-5" />}>Item B</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="c" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group C</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Cog className="w-5 h-5" />}>Item C</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="d" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group D</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Cog className="w-5 h-5" />}>Item D</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 p-6 space-y-4">
            <SidebarTrigger>
              <ArrowLeftCircle className="h-5 w-5" />
            </SidebarTrigger>
            <div>Order: {order.join(', ')}</div>
          </div>
        </SidebarProvider>
      </div>;
  }
}`,...(G=(h=u.parameters)==null?void 0:h.docs)==null?void 0:G.source}}};const P=["ReorderGroups"];export{u as ReorderGroups,P as __namedExportsOrder,R as default};
