# IMAGE GRADIENT: directional change in the intensity/color in an image
# This is one the fundamental builiding block in image processing.
# Image gradient is used to find edges inside the image.

import cv2
import numpy as np
from matplotlib import pyplot as plt

# IMAGE Gradient methods:
# 1.) Laplacian derivatives
# 2.) Sobal X              # this is joint gaussian and differentiation operations.
# 3.) Sobal Y              # Horizontal changes observed properly.
# 4.) Sobel combined
# 5.) Canny edge detection
# Canny: edge detection operator that uses multi stage algo to detect wide range of edges.
# Canny: (Noise reduction+gradient calculation+non-max suppression+double threshold+edge tracking by Hysteresis)
# these methods uses different mathematical operations to produce the required image.

img = cv2.imread('selfie.JPG',cv2.IMREAD_GRAYSCALE)
lap = cv2.Laplacian(img,cv2.CV_64F,ksize=3)
# CV_64F is just a data-type, 64 bit float that supports negative number
lap = np.uint8(np.absolute(lap))
# this output is suitable for our work, absolute work to unsigned 8 bit integer.
sobelX = cv2.Sobel(img,cv2.CV_64F,1,0)
# 3rd argument is 1(order of derivative in x dir), 4th is 0 for dy in case of sobelX.
sobelY = cv2.Sobel(img,cv2.CV_64F,0,1)
# 3rd argument is 0, 4th(order of derivative in y dir) is 1 for dy in case of sobelX.
sobelX = np.uint8(np.absolute(sobelX))
sobelY = np.uint8(np.absolute(sobelY))

sobelcombine = cv2.bitwise_or(sobelX,sobelY)

edges = cv2.Canny(img,100,200)

titles = ['Image','Laplacian','SobelX','SobelY','Sobel combined','Canny']
images = [img,lap,sobelX,sobelY,sobelcombine,edges]

for i in range(6):
    plt.subplot(2,3,i+1),plt.imshow(images[i],'gray')
    plt.title(titles[i])
    plt.xticks([]),plt.yticks([])

plt.show()