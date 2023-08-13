import styled from '@emotion/styled';
import { Menu } from '@mantine/core';
import { startCase } from 'lodash';
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { MdDownload } from 'react-icons/md';

import type { ObjectDimensions, UnsplashImage } from '~/config/types';
import useCanvasContext from '~/context/useCanvasContext';
import getDimensionsFromImage from '~/utils/getDimensionsFromImage';
import getImageElementFromUrl from '~/utils/getImageElementFromUrl';
import notification from '~/utils/notification';

const ImageButton = styled('button')`
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Img = styled('img')`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 120px;

  &:hover {
    opacity: 0.8;
  }
`;

export interface OptionItem {
  imageUrl: string;
  imageElement: HTMLImageElement;
  dimensions: ObjectDimensions;
}

interface Props {
  image: UnsplashImage;
  pushImageObject: (optionItem: OptionItem) => void;
}

export default function UnsplashImageButton({ image, pushImageObject }: Props) {
  const [imageMenuOptions, setImageMenuOptions] = useState<Record<string, OptionItem>>({});
  const { contextRef } = useCanvasContext();

  return (
    <Menu shadow="md" width={220}>
      <Menu.Target>
        <ImageButton
          key={image.id}
          onClick={async () => {
            try {
              const newState: Record<string, OptionItem> = {};
              for (const [key, imageUrl] of Object.entries(image.urls || {})) {
                const imageElement = await getImageElementFromUrl(imageUrl);
                const dimensions = await getDimensionsFromImage({
                  context: contextRef?.current,
                  imageObject: { x: 0, y: 0, imageElement },
                });
                newState[key] = {
                  imageUrl,
                  imageElement: imageElement,
                  dimensions,
                };
              }
              setImageMenuOptions(newState);
            } catch (error) {
              console.error(error);
              notification.error({
                message: (error as Error)?.message,
              });
            }
          }}
        >
          <Img src={image.urls.small} alt={image.description} />
        </ImageButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Image Sizes</Menu.Label>
        {Object.keys(imageMenuOptions).length === 0 ? (
          <Menu.Item>Loading...</Menu.Item>
        ) : (
          Object.entries(imageMenuOptions).map(([key, imageOption]) => (
            <Menu.Item
              key={key}
              icon={<MdDownload size={14} />}
              onClick={() => {
                pushImageObject(imageOption);
              }}
            >
              {`${startCase(key)} (${imageOption.dimensions.width} x ${imageOption.dimensions.height} px)`}
            </Menu.Item>
          ))
        )}
        <Menu.Divider />
        <Menu.Item
          sx={{ opacity: 0.75 }}
          icon={<BiUser size={14} />}
          onClick={() => {
            if (image.author.url) {
              window.open(image.author.url, '_blank');
            }
          }}
        >
          Photo by {image.author.name} on Unsplash
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<CgClose size={14} />} color="red">
          Close
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
