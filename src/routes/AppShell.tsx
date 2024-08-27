const appShellCss = {
    padding: '1rem',
    textAlign: 'center'
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
}


export default function AppShell(props) {
    return (<div style={appShellCss} className="app-shell">{props.children}</div>)
}