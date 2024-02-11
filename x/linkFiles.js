// @ts-nocheck

import fs from "fs-extra"
import path from "path"

const targetFolder = `models`

const tasks = [
  {
    from: `D:/invoke/food/xl/checkpoint/Juggernaut Inpaint (sevenof9247)/Jugger_inpaint_v8/Juggernaut_Inpaint_(sevenof9247)_Jugger_inpaint_v8_fp16_pruned.safetensors`
  },
  {
    from: `D:/invoke/food/xl/checkpoint/Pony Diffusion (PurpleSmartAI)/V6 start with this one/Pony_Diffusion_(PurpleSmartAI)_V6_start_with_this_one_fp16_pruned.safetensors`
  },
  {
    from: `D:/invoke/food/xl/checkpoint/Realism Engine (razzz)/v3_0 VAE/Realism_Engine_(razzz)_v3_0_VAE_fp16_pruned.safetensors`
  },
  {
    from: `D:/invoke/food/xl/embedding/Peopleneg (civitai)/v1_0/peopleneg_civitai_v1_0.safetensors`,
    type: `embedding`
  },
  {
    from: `D:/invoke/food/xl/embedding/Unaesthetic (Aikimi)/2v10/unaesthetic_aikimi_2v10.safetensors`,
    type: `embedding`
  },
  {
    from: process.env.INVOKEAI_ROOT + `/models/sdxl/vae/sdxl-vae/sdxl_vae.safetensors`,
    type: `vae`
  },
  {
    from: process.env.INVOKEAI_ROOT + `/models/sdxl/vae/sdxl-1-0-vae-fix/diffusion_pytorch_model.safetensors`,
    type: `vae`
  }
]

const taskTypeToFolder = {
  checkpoint: `Stable-diffusion`,
  lora: `Lora`,
  vae: `VAE`
}

for (const task of tasks) {
  const taskType = task.type ?? `checkpoint`
  if (taskType === `embedding`) {
    continue
  }
  const fromBase = path.basename(task.from, `.safetensors`)
  const categoryFolder = taskTypeToFolder[taskType]
  const target = `${targetFolder}/${categoryFolder}/${fromBase}.safetensors`
  const alreadyExists = await fs.pathExists(target)
  if (alreadyExists) {
    console.log(`Skipping ${target} because it already exists`)
    continue
  } else {
    console.log(`Copying ${task.from} to ${target}`)
    await fs.symlink(task.from, target)
  }
}
