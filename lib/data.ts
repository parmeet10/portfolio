import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio-data.json')

export interface PersonalInfo {
  name: string
  title: string
  description: string
  email: string
  phone: string | string[]
  github: string
  linkedin: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  period: string
  description: string[]
  color: string
}

export interface Project {
  id: string
  title: string
  type: string
  description: string
  features: string[]
  technologies: string[]
  link: string
  color: string
}

export interface SkillCategory {
  title: string
  skills: string[]
  color: string
}

export interface Skills {
  languages: SkillCategory
  technologies: SkillCategory
  webDevTools: SkillCategory
  frameworks: SkillCategory
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  achievement: string
  color: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  projects: Project[]
  skills: Skills
  education: Education[]
  interests: string
}

export function getPortfolioData(): PortfolioData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    throw new Error('Failed to read portfolio data')
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving portfolio data:', error)
    throw new Error('Failed to save portfolio data')
  }
}

