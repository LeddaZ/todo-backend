import { fakerIT as faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

function generateImgLink() {
  return {
    url: faker.image.avatar()
  }
}

function generateLinks(num: number) {
  const imgList: any[] = []
  for (let i = 0; i < num; i++) {
    imgList.push(generateImgLink())
  }
  writeFileSync('./src/utils/image-links.json', JSON.stringify(imgList), {
    encoding: 'utf-8'
  })
}

generateLinks(15)
