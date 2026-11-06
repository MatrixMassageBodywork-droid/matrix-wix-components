"""Copy selected source images and make display derivatives; no live changes."""
from pathlib import Path
from PIL import Image, ImageOps
import json, shutil, hashlib

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
SOURCE = Path('/workspace/scratch/24b9db76697d/photo-candidates')
GENERATED = Path('/workspace/scratch/24b9db76697d/generated_images')
spec = [
 ('facials', 'facial-mask', SOURCE/'IMG_2970.jpg', 'https://drive.google.com/file/d/1b4ZwZtBk0nkrqF_QcboAC7BaM11vLufE/view', 'Existing Matrix marketing treatment photograph'),
 ('facials', 'facial-treatment', SOURCE/'IMG_7015.jpg', 'https://drive.google.com/file/d/1YLL2SxXPpyzFAEYSWMdEtFmFGjVpzxR_/view', 'Existing Matrix marketing treatment photograph'),
 ('facials', 'circadia-serums', SOURCE/'IMG_2767.jpg', 'https://drive.google.com/file/d/1dCj4qjWedZ3e4kubRM33swKyIcNHfUqg/view', 'Existing Matrix marketing product photograph'),
 ('facials', 'circadia-hydration', SOURCE/'IMG_2768.jpg', 'https://drive.google.com/file/d/1mqPSZutXpPFyjEMfkgctG_5ys3iP6R6_/view', 'Existing Matrix marketing product photograph'),
 ('head-spa', 'matrix-waterfall', SOURCE/'head-waterfall.jpg', 'https://static.wixstatic.com/media/e4cc43_a34c164981e64d1e94d5ebd93d9a7181~mv2.jpg', 'Existing public Matrix Head Spa treatment photograph'),
 ('head-spa', 'matrix-scalp-care', SOURCE/'head-basin.jpeg', 'https://static.wixstatic.com/media/e4cc43_8b943f9192c3477b892b1267162fa2fc~mv2.jpeg', 'Existing public Matrix Head Spa treatment photograph'),
 ('head-spa', 'matrix-products', SOURCE/'head-products.jpeg', 'https://static.wixstatic.com/media/e4cc43_a6f7c611d563475db49e418bb571a626~mv2.jpeg', 'Existing public Matrix infusion photograph'),
 ('head-spa', 'matrix-infusions', SOURCE/'head-infusions.jpeg', 'https://static.wixstatic.com/media/e4cc43_75fb2173a1444fe8b9f220044d57ec56~mv2.jpeg', 'Existing public Matrix infusion photograph'),
 ('waxing', 'wax-preparation', GENERATED/'exec-4b404162-dd23-4573-8e65-acd3a6007ce7.png', 'Built-in image generation, 2026-11-06', 'Illustrative documentary-style wax preparation; not actual Matrix equipment'),
 ('waxing', 'brow-detail', GENERATED/'exec-46519670-2713-4f5f-9734-bf6fd4eec244.png', 'Built-in image generation, 2026-11-06', 'Illustrative documentary-style brow waxing; not an actual Matrix client'),
]
manifest=[]
for key,name,src,url,provenance in spec:
 dest=ROOT/'pages/spa-beauty'/key/'assets/review-2';dest.mkdir(parents=True,exist_ok=True)
 original=dest/(name+'-original'+src.suffix);shutil.copy2(src,original)
 with Image.open(src) as source:
  im=ImageOps.exif_transpose(source).convert('RGB');im.thumbnail((1440,1600))
  optimized=dest/(name+'.webp');im.save(optimized,'WEBP',quality=86,method=6)
  manifest.append(dict(page=key,name=name,source=url,provenance=provenance,original=str(original.relative_to(ROOT)),optimized=str(optimized.relative_to(ROOT)),dimensions=list(im.size),sha256=hashlib.sha256(optimized.read_bytes()).hexdigest()))
 # Strict decoding catches damaged images instead of accepting partial pixels.
 with Image.open(optimized) as check:check.load()
manifest.append(dict(name='water',source='pages/massage/manual-lymphatic-drainage/assets/matrix-water-background.webp',provenance='Intact existing Matrix water texture. Do not use damaged main/assets/water.jpeg.'))
manifest.append(dict(name='logo',source='pages/massage/deep-tissue/assets/matrix-bodywork-approved.jpg',provenance='Exact owner-approved artwork; preserve 4px black frame.'))
(HERE/'IMAGE_PROVENANCE.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'selectedPhotos':len(spec),'originalsAndDerivatives':len(spec)*2}))
