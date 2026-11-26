import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    "https://phucthanhholding.com",
    "https://shop.phucthanhholding.com",
    "https://studio.phucthanhholding.com",
    "https://unbounce.phucthanhholding.com"
]

print("=== Verifying Apple Typography Across Ecosystem ===")
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 Apple-Typography-Auditor'})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            status = resp.status
            # Find css links
            css_matches = re.findall(r'href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', content)
            has_apple_style = "apple-hig-typography" in content or "SF Pro" in content or "-apple-system" in content
            
            # Check css files if inline didn't have it
            css_has_sf = False
            for css in css_matches[:3]:
                css_url = css if css.startswith("http") else url.rstrip("/") + ("/" if not css.startswith("/") else "") + css
                try:
                    c_req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(c_req, timeout=5, context=ctx) as c_resp:
                        c_text = c_resp.read().decode('utf-8', errors='ignore')
                        if "SF Pro" in c_text or "-apple-system" in c_text:
                            css_has_sf = True
                            break
                except Exception:
                    pass
            
            passed = has_apple_style or css_has_sf
            print(f"[{'PASS' if passed else 'FAIL'}] {url} (HTTP {status}) - Apple Font Detected: {passed}")
    except Exception as e:
        print(f"[ERROR] {url}: {e}")
