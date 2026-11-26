#!/usr/bin/env python3
import subprocess
import os
import sys

REMOTE_HOST = "phuclv@192.168.1.238"

APPLE_CSS = """
/* Apple HIG Typography System */
:root {
  --apple-font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro", "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --apple-font-mono: "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
*, *::before, *::after {
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
}
body, button, input, select, textarea, div, span, p, a, h1, h2, h3, h4, h5, h6, label, table, td, th, li {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro", "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
code, pre, kbd, samp, .font-mono, [class*="mono"], [class*="code"] {
  font-family: "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
}
h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.022em !important;
}
p {
  letter-spacing: -0.006em !important;
}
"""

def run_cmd(cmd, check=True):
    print(f"--> Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.stdout:
        print(res.stdout.strip())
    if res.stderr and res.returncode != 0:
        print(f"Error (code {res.returncode}): {res.stderr.strip()}", file=sys.stderr)
    if check and res.returncode != 0:
        raise RuntimeError(f"Command failed: {cmd}")
    return res

def main():
    print("=== 1. Building phucthanhholding.com and shop ===")
    run_cmd("node scripts/build.mjs")
    run_cmd("node shop/build.mjs")

    print("\n=== 2. Syncing phucthanhholding.com to remote server ===")
    run_cmd(f"scp -r out/* {REMOTE_HOST}:/srv/phucthanhholding/fresh-stack/html/")

    print("\n=== 3. Syncing shop.phucthanhholding.com to remote server ===")
    run_cmd(f"scp -r deployment/shop-studio/html/* {REMOTE_HOST}:/srv/phucthanhholding/ai-shop/html/")

    print("\n=== 4. Updating remote configurations ===")
    remote_script = '''
set -e

# 1. Update autovideo-web (studio) static style.css
AUTOVIDEO_CSS="/srv/phucthanhholding/labs/autovideo-web/static/style.css"
if [ -f "$AUTOVIDEO_CSS" ]; then
    echo "Updating $AUTOVIDEO_CSS with Apple HIG typography..."
    sed -i 's/font-family:Inter,"Segoe UI",Arial,sans-serif;/font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","SF Pro","Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;/g' "$AUTOVIDEO_CSS"
fi

# 2. Update unbounce-site index.html with native Apple HIG style
UNBOUNCE_HTML="/srv/phucthanhholding/labs/unbounce-site/index.html"
if [ -f "$UNBOUNCE_HTML" ]; then
    echo "Updating $UNBOUNCE_HTML with Apple HIG style..."
    if ! grep -q 'apple-hig-typography' "$UNBOUNCE_HTML"; then
        sed -i 's|</head>|<style id="apple-hig-typography">*,*::before,*::after{-webkit-font-smoothing:antialiased!important;-moz-osx-font-smoothing:grayscale!important;text-rendering:optimizeLegibility!important;}body,button,input,select,textarea,div,span,p,a,h1,h2,h3,h4,h5,h6,label,table,td,th,li{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","SF Pro","Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif!important;}code,pre,kbd,samp{font-family:"SF Mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace!important;}h1,h2,h3,h4,h5,h6{letter-spacing:-0.022em!important;}p{letter-spacing:-0.006em!important;}</style></head>|' "$UNBOUNCE_HTML"
    fi
fi

# 3. Configure NPM custom server_proxy.conf
mkdir -p /srv/phucthanhholding/edge/data/nginx/custom
cat << 'EOF' > /srv/phucthanhholding/edge/data/nginx/custom/server_proxy.conf
sub_filter_once off;
sub_filter_types text/html text/css;
sub_filter '</head>' '<style id="apple-hig-typography">*,*::before,*::after{-webkit-font-smoothing:antialiased!important;-moz-osx-font-smoothing:grayscale!important;text-rendering:optimizeLegibility!important;}body,button,input,select,textarea,div,span,p,a,h1,h2,h3,h4,h5,h6,label,table,td,th,li{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","SF Pro","Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif!important;}code,pre,kbd,samp{font-family:"SF Mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace!important;}h1,h2,h3,h4,h5,h6{letter-spacing:-0.022em!important;}p{letter-spacing:-0.006em!important;}</style></head>';
EOF

# 4. Ensure proxy.conf in NPM has Accept-Encoding disabled for sub_filter
cat << 'EOF' | docker exec -i npm sh -c 'cat > /etc/nginx/conf.d/include/proxy.conf'
add_header       X-Served-By $host;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Scheme $x_forwarded_scheme;
proxy_set_header X-Forwarded-Proto  $x_forwarded_proto;
proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP          $remote_addr;
proxy_set_header Accept-Encoding    "";
proxy_pass       $forward_scheme://$server:$port$request_uri;
EOF

# 5. Test and reload NPM Nginx
echo "Testing NPM Nginx syntax..."
docker exec npm nginx -t
echo "Reloading NPM Nginx..."
docker exec npm nginx -s reload

# 6. Reload website containers
docker restart phucthanhholding-fresh-website-1 phucthanh-ai-shop-website-1
echo "All services reloaded successfully."
'''
    # Normalize line endings for Linux bash and pass as raw bytes
    remote_script_bytes = remote_script.replace('\r\n', '\n').strip().encode('utf-8')
    # Execute remote script via stdin
    print("--> Executing remote bash script...")
    res = subprocess.run(["ssh", "-o", "StrictHostKeyChecking=no", REMOTE_HOST, "bash -s"], input=remote_script_bytes, capture_output=True)
    out_str = res.stdout.decode('utf-8', errors='replace').strip() if res.stdout else ""
    err_str = res.stderr.decode('utf-8', errors='replace').strip() if res.stderr else ""
    if out_str:
        print(out_str)
    if err_str and res.returncode != 0:
        print(f"Error (code {res.returncode}): {err_str}", file=sys.stderr)
    if res.returncode != 0:
        raise RuntimeError("Remote script execution failed")
    print("\n=== Deployment Completed Successfully! ===")

if __name__ == "__main__":
    main()
